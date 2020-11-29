using System.Collections.Generic;

namespace Api.Hubs
{
    public class ConnectionStore
    {
        private Dictionary<string, string> _connections;

        public ConnectionStore()
        {
            _connections = new Dictionary<string, string>();
        }

        public void Add(string key, string connectionId)
        {
            bool isSuccess = _connections.TryGetValue(key, out string connectionIdInStore);

            if (isSuccess)
            {
                if (connectionIdInStore != connectionId)
                {
                    _connections[key] = connectionId;
                }
            }
            else
            {
                _connections.Add(key, connectionId);
            }
        }

        public void Remove(string key)
        {
            bool isSuccess = _connections.TryGetValue(key, out string connectionIdInStore);

            if (isSuccess)
            {
                _connections.Remove(key);
            }
        }

        public string GetConnectionId(string key)
        {
            bool isSuccess = _connections.TryGetValue(key, out string connectionIdInStore);

            if (isSuccess)
            {
                return connectionIdInStore;
            }

            return string.Empty;
        }

    }
}