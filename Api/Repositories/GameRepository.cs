using System;
using System.Collections.Generic;
using System.Linq;
using Api.Models;

namespace Api.Repositories
{
    public class GameRepository
    {
        private readonly List<Game> _games;

        public GameRepository()
        {
            _games = new List<Game>();
        }

        public Game Create()
        {
            var gameId = Guid.NewGuid().ToString().Split('-')[0];

            var game = new Game
            {
                CurrentCard = 0,
                Decrets = GenerateDecrets(),
                Id = gameId,
                Players = new List<Player>(),
                PlayedCards = new List<int>(),
            };

            if (!_games.Exists(e => e.Id == gameId))
            {
                _games.Add(game);
            }

            return game;
        }

        public void AddPlayer(string gameId, string playerId)
        {
            var game = _games.FirstOrDefault(e => e.Id == gameId);

            if (game != null)
            {
                if (!game.Players.Exists(e => e.Id == playerId))
                {
                    var player = new Player
                    {
                        Id = playerId
                    };

                    game.Players.Add(player);
                }
            }
        }

        public void RemovePlayer(string gameId, string playerId)
        {
             var game = _games.FirstOrDefault(e => e.Id == gameId);

            if (game != null)
            {
                var player = game.Players.FirstOrDefault(e => e.Id == playerId);

                if (player != null)
                {
                    game.Players.Remove(player);
                }
            }
        }

        public Game Get(string gameId)
        {
            var game = _games.FirstOrDefault(e => e.Id == gameId);

            return game;
        }

        private List<Decret> GenerateDecrets()
        {
            return new List<Decret>
            {
                new Decret
                {
                    Id = 'A',
                    CardId = 123
                },
                new Decret
                {
                    Id = 'B',
                    CardId = 234
                },
                new Decret
                {
                    Id = 'C',
                    CardId = 345
                },
                new Decret
                {
                    Id = 'D',
                    CardId = 456
                }
            };
        }
    }
}