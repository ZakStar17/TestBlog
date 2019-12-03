using System;
using System.Collections.Generic;

namespace Domain
{
    public class Post
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Content { get; set; }
        public DateTime Date { get; set; }
        public bool HasBeenEdited { get; set; }
        public List<Reply> Replies { get; set; }
    }
}