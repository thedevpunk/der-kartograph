using System.Collections.Generic;

namespace Api.Models
{
    public class Game
    {
        public string Id { get; set; }

        public List<Player> Players { get; set; }

        public int CurrentCard { get; set; }

        public List<int> PlayedCards { get; set; }

        public List<Decret> Decrets { get; set; }
    }
}