using System.Collections;
using System.Collections.Generic;

using UnityEngine;

using Cinemachine;
public class VCamSwitcher : MonoBehaviour
{   
    private GameObject[] _vcam;
    private int _cidx = 0;

    private void Start()
    {
        _vcam = GameObject.FindGameObjectsWithTag("CinemachineTarget");
        _vcam[0].SetActive(false);
        _vcam[1].SetActive(true);   
    }


    private void Update()
    {
        if (Input.GetKeyUp(KeyCode.Alpha9))
        {
            _cidx = (_cidx + 1) % 2;

            if (_cidx < 1)
            {
                _vcam[0].SetActive(true);
                _vcam[1].SetActive(false);   
            } else {
                _vcam[0].SetActive(false);
                _vcam[1].SetActive(true);   
            }
        }
    }
}