namespace Shine.Data.Dto.Token
{
    public class TokenResponseDto
    {
        public string Token { get; set; }
        public int Expiration { get; set; }
        public string RefreshToken { get; set; }
    }
}