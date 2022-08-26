import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getAllPlaylists, getTracksByID } from "../../firebase/playlists";
import { useHistory } from "react-router-dom";
import "./home.css";
export default function Home() {
  let [playlists, setPlaylists] = useState([]);
  let [tracks, setTracks] = useState([]);
  let [selectValue, setSelectValue] = useState("");
  let [searchValue, setSearchValue] = useState("");
  let history = useHistory();
  useEffect(() => {
    getAllPlaylists().then((data) => {
      setPlaylists(data);
    });
  }, []);
  let handleSelectChange = (e) => {
    setSelectValue(e.target.value);
    console.log(selectValue);
  };
  let handleSearchBtn = () => {
    setPlaylists([]);
    switch (selectValue) {
      case "track": {
        playlists.length > 0 &&
          playlists.map((playlistSearch) => {
            playlistSearch.tracks?.map((track_id) => {
              getTracksByID(track_id).then((track) => {
                if (
                  track.name.toLowerCase().indexOf(searchValue.toLowerCase()) !=
                  -1
                ) {
                  console.log(playlistSearch);
                  setTracks((prevState) => {
                    return [
                      ...prevState,
                      {
                        ...track,
                        playlistId: playlistSearch.playlist_id,
                        playlistName: playlistSearch.name,
                      },
                    ];
                  });
                }
              });
            });
          });
      }
      case "all": {
        setTracks([]);
        getAllPlaylists().then((data) => {
          console.log(tracks);
          setPlaylists(data);
        });
      }
      case "playlist": {
        playlists.length > 0 &&
          playlists.map((playlistSearch) => {
            if (
              playlistSearch.name
                .toLowerCase()
                .indexOf(searchValue.toLowerCase()) != -1
            )
              setPlaylists((prevState) => {
                return [...prevState, playlistSearch];
              });
          });
      }
    }
  };
  let handleSearchInput = (e) => {
    console.log(e.target.value);
    setSearchValue(e.target.value);
  };
  return (
    <div className="home pt-5">
      {/* HANDLE: Search */}
      <div className="home__search d-flex justify-content-center align-items-center my-5">
        <select
          className="home__search-select"
          value={selectValue}
          onChange={(e) => handleSelectChange(e)}
        >
          <option selected disabled={true}>
            Search Type
          </option>
          <option value="all">All</option>
          <option value="track">Track</option>
          <option value="playlist">Playlist</option>
        </select>
        <input
          type="text"
          className="w-50 home__search-input  fs-4"
          placeholder="Search For Specific Podcast"
          name="search"
          value={searchValue}
          onChange={(e) => handleSearchInput(e)}
          id="search"
          list="searchDataList"
        />
        <datalist id="searchDataList">
          {selectValue == "playlist"
            ? playlists?.map((playlist, index) => {
                console.log(playlist.name);
                return (
                  <option
                    value={`${playlist.name}`}
                    key={index}
                    className="bg-secondary"
                  />
                );
              })
            : tracks.map((track, index) => {
                console.log(tracks);
                return <option value={`${track.name}`} key={index} />;
              })}
          {/* {selectValue == "track" &&
            tracks.map((track, index) => {
              console.log(tracks);
              return <option value={`${track.name}`} key={index} />;
            })} */}
        </datalist>
        <button
          className="customBtn primaryBtn ms-2 py-3"
          onClick={handleSearchBtn}
        >
          Search
        </button>
      </div>
      {/* HANDLE: playlist view */}
      {playlists?.length != 0 ? (
        tracks.length != 0 ? (
          <div className="container py-5">
            <div className="row g-4 gy-5">
              {tracks.map((track, index) => (
                <div
                  className="col-md-3 d-flex justify-content-center align-items-center"
                  key={index}
                >
                  <div
                    className="customCard"
                    onClick={() => {
                      history.push(`/${track.playlistId}/tracks`);
                    }}
                  >
                    <p className="customCard__number">
                      {index < 10 ? `0${index + 1}` : index + 1}
                    </p>
                    <i
                      className="fa-solid fa-headphones-simple "
                      style={{
                        fontSize: "8rem",
                      }}
                    ></i>
                    <p className="customCard__name">{track.name}</p>
                    <span>{track.playlistName}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="container py-5">
            <div className="row g-4 gy-5">
              {playlists.map((playlist, index) => (
                <div
                  className="col-md-3 d-flex justify-content-center align-items-center"
                  key={index}
                >
                  <div
                    className="customCard"
                    onClick={() => {
                      if (playlist.tracks.length > 0)
                        history.push(`/${playlist.playlist_id}/tracks`);
                    }}
                  >
                    <p className="customCard__number">
                      {index < 10 ? `0${index + 1}` : index + 1}
                    </p>
                    <img src={playlist.image} />
                    <p className="customCard__name">{playlist.name}</p>
                    <span>
                      {playlist.tracks?.length
                        ? playlist.tracks?.length + " Track"
                        : "No Tracks yet"}{" "}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      ) : (
        <div
          style={{
            minHeight: 650,
          }}
          className="d-flex justify-content-center align-items-center"
        >
          <div
            className="spinner-grow text-light "
            role="status"
            style={{ width: 100, height: 100 }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}
