using System;
using System.Collections.Generic;
using System.Linq;

namespace Api.Hubs
{
    public class SessionStore
    {
        private Dictionary<string, List<string>> _sessions;

        private Dictionary<string, string> _connections;

        public SessionStore()
        {
            _sessions = new Dictionary<string, List<string>>();
            _connections = new Dictionary<string, string>();
        }

        public string Create()
        {
            var sessionId = Guid.NewGuid().ToString();

            _sessions.Add(sessionId, new List<string>());

            return sessionId;
        }

        public void Add(string sessionId, string clientId, string connectionId)
        {
            var session = _sessions.FirstOrDefault(e => e.Key == sessionId);

            if (!string.IsNullOrEmpty(session.Key))
            {
                // TODO: Prüfung ob bereits in session vorhanden.
                session.Value.Add(clientId);

                if (!string.IsNullOrEmpty(_connections.FirstOrDefault(e => e.Key == clientId).Key))
                {
                    _connections.Remove(clientId);
                }

                _connections.Add(clientId, connectionId);
            }
        }

        public void Remove(string sessionId, string clientId, string connectionId)
        {
            var session = _sessions.FirstOrDefault(e => e.Key == sessionId);

            if (!string.IsNullOrEmpty(session.Key))
            {
                session.Value.Remove(clientId);

                _connections.Remove(clientId);
            }
        }

        public List<string> GetClients(string sessionId)
        {
            var session = _sessions.FirstOrDefault(e => e.Key == sessionId);

            if (!string.IsNullOrEmpty(session.Key))
            {
                return session.Value;
            }

            return new List<string>();
        }



    }
}