using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Presistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Activities.Any()) return;

            var Activities = new List<Activity>
            {
                new Activity
                {
                    Title = "Past Activity 1",
                    Date = DateTime.Now.AddMonths(-1),
                    Description = "Activity 1 months in the past",
                    Category = "Drinks",
                    City = "Sherouk",
                    Venue = "Sherouk Cafe",
                },
                new Activity
                {
                    Title = "Past Activity 2",
                    Date = DateTime.Now.AddMonths(-2),
                    Description = "Activity 2 months in the past",
                    Category = "Films",
                    City = "Oubour",
                    Venue = "Oubour cinema",
                },
                new Activity
                {
                    Title = "future Activity 1",
                    Date = DateTime.Now.AddMonths(8),
                    Description = "Activity 8 months in the future",
                    Category = "Food",
                    City = "AcherMinRamadan",
                    Venue = "Geka Pizza",
                }
            };

            await context.Activities.AddRangeAsync(Activities);
            await context.SaveChangesAsync();
        }
    }
}