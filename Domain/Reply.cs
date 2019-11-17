using System;

namespace Domain
{
    public class Reply
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Content { get; set; }
        public DateTime Date { get; set; }
    }
}