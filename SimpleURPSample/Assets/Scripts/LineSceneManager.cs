using System.Collections.Generic;
using System.Xml;

using UnityEngine;

public class LineSceneManager : MonoBehaviour
{
    // private AsyncOperationHandle<GameObject> prefabHandle;
    // private GameObject spawnedGameObject;
    public GameObject lineObject;
    private List<Vector3> kmll;

    private Vector2 _localOrigin = Vector2.zero;
    private float _LatOrigin { get { return _localOrigin.x; } }
    private float _LonOrigin { get { return _localOrigin.y; } }

    private float metersPerLat;
    private float metersPerLon;

    // - refs: https://github.com/MichaelTaylor3D/UnityGPSConverter/blob/master/GPSEncoder.cs
    private void FindMetersPerLat(float lat) // Compute lengths of degrees
    {
        float m1 = 111132.92f;    // latitude calculation term 1
        float m2 = -559.82f;        // latitude calculation term 2
        float m3 = 1.175f;      // latitude calculation term 3
        float m4 = -0.0023f;        // latitude calculation term 4
        float p1 = 111412.84f;    // longitude calculation term 1
        float p2 = -93.5f;      // longitude calculation term 2
        float p3 = 0.118f;      // longitude calculation term 3

        lat = lat * Mathf.Deg2Rad;

        // Calculate the length of a degree of latitude and longitude in meters
        metersPerLat = m1 + (m2 * Mathf.Cos(2 * (float)lat)) + (m3 * Mathf.Cos(4 * (float)lat)) + (m4 * Mathf.Cos(6 * (float)lat));
        metersPerLon = (p1 * Mathf.Cos((float)lat)) + (p2 * Mathf.Cos(3 * (float)lat)) + (p3 * Mathf.Cos(5 * (float)lat));
    }

    private Vector3 ConvertGPStoUCS(Vector2 gps)
    {
        FindMetersPerLat(_LatOrigin);
        float zPosition = metersPerLat * (gps.x - _LatOrigin); //Calc current lat
        float xPosition = metersPerLon * (gps.y - _LonOrigin); //Calc current lat
        return new Vector3((float)xPosition, 0, (float)zPosition);
    }
    // --

    private void Start()
    {
        lineObject = GameObject.Find("Line");
        LineRenderer lRenderer = lineObject.GetComponent<LineRenderer>();
        kmll = new List<Vector3>();
        _localOrigin = new Vector2(139.03225f, 36.4161f);

        XmlDocument doc = new XmlDocument();
        doc.Load(Application.streamingAssetsPath + "/2022-04-18.kml.xml");
        XmlNodeList elemList = doc.GetElementsByTagName("coordinates");

        for (int i = 0; i < elemList.Count; i++)
        {
            string[] segmented = elemList[i].InnerText.Split("\t");
            for (int j = 0; j < segmented.Length; j++)
            {
                if (!System.String.IsNullOrEmpty(segmented[j]) && !System.String.IsNullOrWhiteSpace(segmented[j]))
                {
                    string[] vs = segmented[j].Split(',');

                    Vector3 vec3 = ConvertGPStoUCS(new Vector2(float.Parse(vs[0]), float.Parse(vs[1])));
                    // vec3.x *= 0.1f;
                    vec3.y += 1.0f;
                    // vec3.z *= 0.1f;
                    kmll.Add(vec3);

                    Debug.Log(kmll[kmll.Count - 1].x + ", " + kmll[kmll.Count - 1].y + ", " + kmll[kmll.Count - 1].z + " (Total: " + kmll.Count + ")");
                }
            }
        }

        lRenderer.SetPositions(kmll.ToArray());
    }


    private void OnDestroy()
    {
    }
}
