using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Models;

namespace Api.Hubs
{
    public interface IClient
    {
        Task ReceiveGameIsCreated(string game);

        Task ReceivePlayerHasJoined(string game);

        Task ReceiveGameInfo(string game);
    }
}