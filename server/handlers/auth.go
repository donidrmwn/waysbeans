package handlers

import (
	"log"
	"net/http"
	authdto "nis-waybeans/dto/auth"
	dto "nis-waybeans/dto/result"
	"nis-waybeans/models"
	"nis-waybeans/pkg/bcrypt"
	jwtToken "nis-waybeans/pkg/jwt"
	"nis-waybeans/repositories"
	"time"

	"github.com/go-playground/validator"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerAuth struct {
	AuthRepository    repositories.AuthRepository
	ProfileRepository repositories.ProfileRepository
}

func HandlerAuth(
	AuthRepository repositories.AuthRepository,
	ProfileRepository repositories.ProfileRepository,
) *handlerAuth {
	return &handlerAuth{
		AuthRepository,
		ProfileRepository,
	}
}

// Register
func (h *handlerAuth) Register(c echo.Context) error {

	request := new(authdto.AuthRequest)
	request.Role = "customer"
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	password, err := bcrypt.HashingPassword(request.Password)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	user := models.User{
		Name:     request.Name,
		Email:    request.Email,
		Password: password,
		Role:     request.Role,
	}

	data, err := h.AuthRepository.Register(user)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
		})
	}

	profile, _ := h.ProfileRepository.GetProfileByUserID(data.ID)
	if profile.ID == 0 {
		profile = models.Profile{
			Name:           request.Name,
			UserID:         data.ID,
			ProfilePicture: "https://res.cloudinary.com/waysbeans/image/upload/v1678843369/waysbeans/profile_wf7tsd.png",
		}

		h.ProfileRepository.CreateProfile(profile)
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: data,
	})
}

func (h *handlerAuth) Login(c echo.Context) error {
	request := new(authdto.LoginRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	user := models.User{
		Email:    request.Email,
		Password: request.Password,
	}
	//Check email
	user, err := h.AuthRepository.Login(user.Email)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	//Check password
	isValid := bcrypt.CheckPasswordHash(request.Password, user.Password)
	if !isValid {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: "Wrong email or password",
		})
	}

	//Generate token
	claims := jwt.MapClaims{}
	claims["id"] = user.ID
	claims["role"] = user.Role
	claims["exp"] = time.Now().Add(time.Hour * 2).Unix() //2 Hours exxpired

	token, errGenerateToken := jwtToken.GenerateToken(&claims)
	if errGenerateToken != nil {
		log.Println(errGenerateToken)
		return echo.NewHTTPError(http.StatusUnauthorized)
	}
	loginResponse := authdto.LoginResponse{
		Name:     user.Name,
		Email:    user.Email,
		Password: user.Password,
		Role:     user.Role,
		Token:    token,
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: loginResponse,
	})
}

func (h *handlerAuth) CheckAuth(c echo.Context) error {
	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	user, _ := h.AuthRepository.CheckAuth(int(userId))

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: user,
	})
}
