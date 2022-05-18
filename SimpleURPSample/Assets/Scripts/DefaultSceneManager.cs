using System.Collections;
using System.Collections.Generic;
// using System.IO;

using UnityEngine;
using UnityEngine.SceneManagement;

using Cinemachine;
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
    public GameObject playerClone;

    private GameObject[] _vcam;
    private int _cidx = 0;

    // private async void Start()
    private void Start()
    {
        // prefabHandle = Addressables.LoadAssetAsync<GameObject>("Assets/Prefabs/Scaniverse Souja 2022-04-18 122326.prefab");

        // GameObject prefab = await prefabHandle.Task;

        // spawnedGameObject = Instantiate(prefab);
        // spawnedGameObject.name = "Spawned Game Object";

        // player = GameObject.Find("PlayerArmature");
        // Instantiate(player, new Vector3(0.0f, 2.0f, 0.0f), Quaternion.identity);

        _vcam = GameObject.FindGameObjectsWithTag("CinemachineTarget");
    }


    private void Update()
    {
        if (Input.GetKeyUp(KeyCode.Alpha1))
        {
            Debug.Log("1 up");
            // player.transform.position = new Vector3(0.0f, 2.0f, 0.0f);
            // if (playerClone)
            // {
            //     Destroy(playerClone);
            // }
            // playerClone = Instantiate(player, new Vector3(0.0f, 2.0f, 0.0f), Quaternion.identity);
        }
        else if (Input.GetKeyUp(KeyCode.Alpha0))
        {
            SceneManager.LoadScene("Line");
        }
        else if (Input.GetKeyUp(KeyCode.Alpha9))
        {
            _cidx = (_cidx + 1) % 3;

            if (_cidx < 1)
            {
                CinemachineVirtualCamera vc = _vcam[0].GetComponent<CinemachineVirtualCamera>();
                CinemachineVirtualCamera vc2 = _vcam[1].GetComponent<CinemachineVirtualCamera>();
                vc.Priority = 9;
                vc2.Priority = 9;
            } else {
                CinemachineVirtualCamera vc = _vcam[0].GetComponent<CinemachineVirtualCamera>();
                CinemachineVirtualCamera vc2 = _vcam[1].GetComponent<CinemachineVirtualCamera>();
                vc.Priority = _cidx == 1 ? 11 : 9;
                vc2.Priority = _cidx == 2 ? 11 : 9;
            }
        }
    }

    private void OnDestroy()
    {
        // Destroy(spawnedGameObject);
        // Addressables.Release(prefabHandle);
    }
}
