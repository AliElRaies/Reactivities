using System.Collections.Generic;
using Domain;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System;
using Application.Activities;

namespace API.Controllers
{
    public class ActivitiesController : BaseAPIController
    {
        
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new List.Query());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivities(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }
        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return Ok(await Mediator.Send(new Create.Command {Activity = activity}));
        }
    }
}