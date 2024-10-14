using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

public class CustomPasswordValidation : ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        var password = value as string;

        if (string.IsNullOrWhiteSpace(password))
        {
            return new ValidationResult("Mật khẩu là bắt buộc.");
        }

        // Check if the first character is uppercase
        if (!char.IsUpper(password[0]))
        {
            return new ValidationResult("Mật khẩu phải bắt đầu bằng chữ cái viết hoa.");
        }

        // Check if the password contains at least one special character
        if (!Regex.IsMatch(password, @"[!@#$%^&*(),.?""':{}|<>]"))
        {
            return new ValidationResult("Mật khẩu phải chứa ít nhất một ký tự đặc biệt.");
        }

        // If both conditions are met, the password is valid
        return ValidationResult.Success;
    }
}
