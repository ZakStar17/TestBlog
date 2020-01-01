using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any())
                {
                    var users = new List<AppUser>
                    {
                        new AppUser
                        {
                            DisplayName = "Josef",
                            UserName = "josef",
                            Email = "josef@test.com"
                        },
                        new AppUser
                        {
                            DisplayName = "Jason",
                            UserName = "jason",
                            Email = "jason@test.com"
                        },
                        new AppUser
                        {
                            DisplayName = "Raven",
                            UserName = "raven",
                            Email = "raven@test.com"
                        }
                    };
                    foreach (var user in users)
                    {
                        await userManager.CreateAsync(user, "Pa$$w0rd");
                    }
                }

            if (!context.Posts.Any())
            {
                var posts = new List<Post>
                {
                    new Post
                    {
                        Username = "User01",
                        Content = "Hi I'm Jordan",
                        HasBeenEdited = true,
                        Date = DateTime.Now.AddMonths(-6),
                        Replies = new List<Reply> {new Reply {
                            Username = "User45",
                            Content = "No you not",
                            Date = DateTime.Now.AddMonths(-4)
                        }}
                    },
                    new Post
                    {
                        Username = "Mike",
                        Content = "Excelent",
                        HasBeenEdited = false,
                        Date = DateTime.Now.AddMonths(-2),
                    },
                    new Post
                    {
                        Username = "User from future",
                        Content = "Hello from future",
                        HasBeenEdited = false,
                        Date = DateTime.Now.AddMonths(30),
                    }
                };

                context.Posts.AddRange(posts);
                context.SaveChanges();
            }
        }
    }
}