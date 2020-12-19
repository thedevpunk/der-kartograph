using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Models;

namespace Api.Hubs
{
    public interface IClient
    {
        Task ReceiveGameIsCreated(Game game);

        Task ReceivePlayerHasJoined(Game game);

        Task ReceiveGameInfo(string game);
    }
}