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
            if(!context.Posts.Any()) 
            {
                var posts = new List<Post> 
                {
                    new Post
                    {
                        Title = "New 1",
                        Content = "Hi I'm Jordan",
                        Date = DateTime.Now.AddMonths(-6)
                    },
                    new Post
                    {
                        Title = "Heyefwef",
                        Content = "Today my name is mike",
                        Date = DateTime.Now.AddMonths(-2)
                    },
                    new Post
                    {
                        Title = "Jiraya",
                        Content = "Hello from future",
                        Date = DateTime.Now.AddMonths(30)
                    }
                };

                context.Posts.AddRange(posts);
                context.SaveChanges();
            }
        }
    }
}