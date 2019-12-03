using System;
using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static void SeedData(DataContext context)
        {
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