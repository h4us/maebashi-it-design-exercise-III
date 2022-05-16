using System.Collections;
using System.Collections.Generic;

using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.SceneManagement;

public class RemoteAudioSceneManager : MonoBehaviour
{
    public GameObject player;
    public GameObject mainCamera;
    public AudioSource audioSource;
    public AudioClip myClip;
    
    private void Start()
    {
        player = GameObject.Find("PlayerArmature");
        mainCamera = GameObject.Find("Main Camera");

        audioSource = mainCamera.GetComponent(typeof(AudioSource)) as AudioSource;
        StartCoroutine(GetAudioClip());
        Debug.Log("Starting to download the audio...");
    }
    
    IEnumerator GetAudioClip()
    {
        using (
            UnityWebRequest www = UnityWebRequestMultimedia.GetAudioClip(
                "https://www.dropbox.com/s/pq5rftmxly3xlv8/2022-04-18.mp3?dl=1", AudioType.MPEG
            )
        )
        {
            yield return www.SendWebRequest();
 
            if (www.result == UnityWebRequest.Result.ConnectionError)
            {
                Debug.Log(www.error);
            }
            else
            {
                myClip = DownloadHandlerAudioClip.GetContent(www);
                audioSource.clip = myClip;
                audioSource.Play();
                Debug.Log("Audio is playing.");
            }
        }
    }

    private void Update()
    {
        if (Input.GetKeyUp(KeyCode.Alpha1))
        {
            player.transform.position = new Vector3(0.0f, 2.0f, 0.0f);
        }

        if (Input.GetKeyUp(KeyCode.Alpha0))
        {
            SceneManager.LoadScene("YanoScene");
        }
    }

    private void OnDestroy()
    {
    }
}
