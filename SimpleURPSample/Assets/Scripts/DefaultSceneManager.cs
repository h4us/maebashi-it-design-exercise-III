using System.Collections;
using System.Collections.Generic;
using System.IO;

using UnityEngine;
// using UnityEngine.AddressableAssets;
// using UnityEngine.ResourceManagement.AsyncOperations;

// [System.Serializable]
// public class GeoJsonObject
// {
//     public string type;
//     public GeoJsonFeature[] features;
// }

public class DefaultSceneManager : MonoBehaviour
{
    // private AsyncOperationHandle<GameObject> prefabHandle;
    // private GameObject spawnedGameObject;

    // private async void Start()
    private void Start()
    {
        // prefabHandle = Addressables.LoadAssetAsync<GameObject>("Assets/Prefabs/Scaniverse Souja 2022-04-18 122326.prefab");

        // GameObject prefab = await prefabHandle.Task;

        // spawnedGameObject = Instantiate(prefab);
        // spawnedGameObject.name = "Spawned Game Object";
    }


    private void OnDestroy()
    {
        // Destroy(spawnedGameObject);
        // Addressables.Release(prefabHandle);
    }
}
