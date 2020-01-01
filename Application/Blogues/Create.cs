using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Blogues
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Username { get; set; }
            public string Content { get; set; }
            public bool HasBeenEdited { get; set; }
            public DateTime Date { get; set; }
            public List<Reply> Replies { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Username).NotEmpty();
                RuleFor(x => x.Content).NotEmpty();
                RuleFor(x => x.Date).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var post = new Post
                {
                    Id = request.Id,
                    Username = request.Username,
                    Content = request.Content,
                    HasBeenEdited = request.HasBeenEdited,
                    Date = request.Date,
                    Replies = request.Replies
                };

                _context.Posts.Add(post);
                var succes = await _context.SaveChangesAsync() > 0;
                if (succes) return Unit.Value;

                throw new Exception("Problem saving changes :(");
            }
        }
    }
}