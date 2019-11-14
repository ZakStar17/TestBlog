using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Blogues
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Content { get; set; }
            public DateTime Date { get; set; }
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
                var activity = new Post
                {
                    Id = request.Id,
                    Title = request.Title,
                    Content = request.Content,
                    Date = request.Date
                };

                _context.Posts.Add(activity);
                var succes = await _context.SaveChangesAsync() > 0;
                if (succes) return Unit.Value;

                throw new Exception("Problem saving changes :(");
            }
        }
    }
}