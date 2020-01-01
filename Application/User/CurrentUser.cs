using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.User
{
    public class CurrentUser
    {
        public class Query : IRequest<User> { }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwtGenerator _jwtGenerator;
            private readonly IUserAccessor _userAcessor;

            public Handler(UserManager<AppUser> userManager, IJwtGenerator jwtGenerator,
            IUserAccessor userAcessor)
            {
                _userManager = userManager;
                _jwtGenerator = jwtGenerator;
                _userAcessor = userAcessor;
            }
            public async Task<User> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByNameAsync(_userAcessor.GetCurrentUsername());

                return new User
                {
                    DisplayName = user.DisplayName,
                    Username = user.UserName,
                    Token = _jwtGenerator.CreateToken(user),
                    Image = null
                };
            }
        }
    }
}