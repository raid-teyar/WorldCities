namespace WorldCities.API.Data.DTOs
{
    public class RegisterResultsDTO
    {
        /// <summary>
        /// TRUE if the login attempt is successful, FALSE otherwise.
        /// </summary>
        public bool Success { get; set; }

        /// <summary>
        /// The list of errors that occured during the registration attempt.
        /// </summary>
        public IEnumerable<string> Errors { get; set; } = null!;
    }
}
