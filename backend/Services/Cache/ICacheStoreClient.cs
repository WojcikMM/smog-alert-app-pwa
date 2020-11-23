using System.Collections.Generic;

namespace SmogAlertAPI.Services.Cache
{
  public interface ICacheStoreClient<T> where T: class
  {
    IEnumerable<T> GetAllRecords(bool failIfNotExists = false);
    IDictionary<int, T> GetAllRectordsDictionary(bool failIfNotExists = false);

    T GetRecordById(int stationId, bool failIfNotExists = false);
    void UpdateRecords(IEnumerable<T> recordsToUpdate);
  }
}
