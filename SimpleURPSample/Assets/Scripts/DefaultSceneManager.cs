using System.Collections;
using System.Collections.Generic;
// using System.IO;

using UnityEngine;
using UnityEngine.SceneManagement;
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

    public GameObject player;

    // private async void Start()
    private void Start()
    {
        // prefabHandle = Addressables.LoadAssetAsync<GameObject>("Assets/Prefabs/Scaniverse Souja 2022-04-18 122326.prefab");

        // GameObject prefab = await prefabHandle.Task;

        // spawnedGameObject = Instantiate(prefab);
        // spawnedGameObject.name = "Spawned Game Object";

        player = GameObject.Find("PlayerArmature");
    }


    private void Update()
    {
        if (Input.GetKeyUp(KeyCode.Alpha1))
        {
            player.transform.position = new Vector3(0.0f, 2.0f, 0.0f);
            Debug.Log("1");
        }

        if (Input.GetKeyUp(KeyCode.Alpha0))
        {
            SceneManager.LoadScene("LineScene");
        }
    }

    private void OnDestroy()
    {
        // Destroy(spawnedGameObject);
        // Addressables.Release(prefabHandle);
    }
}
