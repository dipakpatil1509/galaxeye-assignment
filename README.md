# GalaxEye Space Assignment
GalaxEye problem statement

## Problem Description
A user comes to a console which has a base-map and an option to draw an AOI
(Area of Interest). Upon selecting and area they will be presented with all the tiles
(pre configured satellite image’s metadata) which are intersecting that AOI.
GalaxEye approaches you for help in developing this console. You can use any
framework for this task.
## Setting the Context
**AIM**: To create an entire full-stack website with docker compose where user can
draw their AOI to see tiles which are interacting with AOI.
Requirements: A docker compose configuration which will spun up a react frontend,
node backend and a database (Any works). Upon selecting an AOI and frontend it
should pull the relative intersecting tiles from the database based on the intersection.
**Dataset for Tiles**:
[https://www.notion.so/signed/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F1a1e461b-4293-428d-88da-5089a8cc8cf3%2Fkarnataka.geojson?table=block&id=f5948521-192e-42a7-8802-d4ec09014796&spaceId=9301458a-f465-42d3-80eb-7c09bae15034&userId=67f0c05a-3453-4c7d-abb2-b607a18028f8&cache=v2](https://www.notion.so/signed/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F1a1e461b-4293-428d-88da-5089a8cc8cf3%2Fkarnataka.geojson?table=block&id=f5948521-192e-42a7-8802-d4ec09014796&spaceId=9301458a-f465-42d3-80eb-7c09bae15034&userId=67f0c05a-3453-4c7d-abb2-b607a18028f8&cache=v2)
(Can load this GeoJSON file to geojson.io to visualize how the tiles look)
Data details: 100 tiles covering the whole state of Karnataka.
Output: Tiles intersecting with the AOI shown on the frontend.
Example Image :
Here Blue represents the AOI, and Red represents the tiles corresponding to it. In
our case, we have 100s of tiles covering whole Karnataka and upon drawing any
region in Karnataka, we will get the tiles intersecting that AOI.
Tip:
Can use libraries such as react-leaflet and leaflet-draw for the
frontend.