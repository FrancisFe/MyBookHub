using Microsoft.AspNetCore.Mvc;

namespace MyBookHub.API.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class ErrorController : ControllerBase
    {

        [Route("/error")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public IActionResult HandleError() =>
            Problem(title: "Error interno", statusCode: 500);
    }

}
