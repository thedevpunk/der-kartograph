using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using System.Linq;
using Api.Repositories;
using Api.Models;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Api.Hubs
{
    public class GamesHub : Hub<IClient>
    {
        private readonly GameRepository _gameRepo;
        private readonly ConnectionStore _connectionStore;

        public GamesHub(GameRepository gameRepo, ConnectionStore connectionStore)
        {
            _connectionStore = connectionStore;
            _gameRepo = gameRepo;
        }

        public Dictionary<string, List<string>> Sessions { get; set; } = new Dictionary<string, List<string>>();

        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
            Console.WriteLine("Connected to SignalR with connection id: " + Context.ConnectionId);
            Console.WriteLine("Connected to SignalR with user identifier: " + Context.User);
        }

        public override async Task OnDisconnectedAsync(Exception ex)
        {

        }

        public async Task CreateGame(string playerId)
        {
            _connectionStore.Add(playerId, Context.ConnectionId);

            Game game = _gameRepo.Create();

            _gameRepo.AddPlayer(game.Id, playerId);

            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

            await Clients.Caller.ReceiveGameIsCreated(game);
        }

        public async Task JoinGame(string gameId, string playerId)
        {
            _connectionStore.Add(playerId, Context.ConnectionId);

            _gameRepo.AddPlayer(gameId, playerId);

            Game game = _gameRepo.Get(gameId);

            await Clients.All.ReceivePlayerHasJoined(game);
        }


        // CLIENT TO SERVER
        // Join Session
        // Ready this Round
        // Points

        // SERVER TO CLIENT
        // Send decret infos
        // Send card infos
        // Send winner
    }
}