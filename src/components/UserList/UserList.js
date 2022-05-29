import React, { useEffect,  useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";

const favoritesKey = "favorites"

const UserList = ({ users, isLoading, isFavoritePage, handleBottom }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [checkedCountries, SetCheckedCountries] = useState(new Set())
  const [favoritesUsers, setFavoritesUsers] = useState({})
  const [filteredUsers, setFilteredUsers] = useState([])


  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = (event) => {
    setHoveredUserId();
  };

  const handleCheck = (country) => {
    const newCheckedCountries = new Set(checkedCountries)
    if (newCheckedCountries.has(country)) {
      newCheckedCountries.delete(country)
    } else {
      newCheckedCountries.add(country)
    }
    SetCheckedCountries(newCheckedCountries)
  }

  const handleFavorite = (user) => {
    const newFavoriteUsers = {...favoritesUsers} 

    if (newFavoriteUsers.hasOwnProperty(user.email)) {
      delete newFavoriteUsers[user.email]
    } else {
      newFavoriteUsers[user.email] = user
    }
    localStorage.setItem(favoritesKey, JSON.stringify(newFavoriteUsers))
    setFavoritesUsers(newFavoriteUsers)
  }

  const handleScroll = (e) => {
    if (!isFavoritePage) {
      const isBottom = Math.floor(e.target.scrollHeight - e.target.scrollTop) === e.target.clientHeight;
      if (isBottom) {
        handleBottom()
      }
    }
    
  }

  useEffect(() => {
    const favoritesStorage = localStorage.getItem(favoritesKey)
    const favoritesStorageParse = JSON.parse(favoritesStorage) ?? {}
    setFavoritesUsers(favoritesStorageParse)
  },[])

  
  useEffect(() => {
    const filterByFavorite = users.filter((user) => {
      if (isFavoritePage) {
        return favoritesUsers.hasOwnProperty(user.email)
      }
      return true
    })

    if (checkedCountries.size === 0) {
      setFilteredUsers(filterByFavorite)
    } else {
      const filterByCountries = filterByFavorite.filter((user) => checkedCountries.has(user.location.country.slice(0, 2).toUpperCase()))
      setFilteredUsers(filterByCountries)
    }
  }, [users, checkedCountries, favoritesUsers])


  return (
    <S.UserList>
      <S.Filters>
        <CheckBox value="BR" label="Brazil" onChange={handleCheck} />
        <CheckBox value="AU" label="Australia" onChange={handleCheck} />
        <CheckBox value="CA" label="Canada" onChange={handleCheck} />
        <CheckBox value="DE" label="Germany" onChange={handleCheck} />
        <CheckBox value="IL" label="Israel" onChange={handleCheck} />
      </S.Filters>
      <S.List onScroll={handleScroll}>
        {filteredUsers.map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper isVisible={favoritesUsers.hasOwnProperty(user.email) || index === hoveredUserId}>
                <IconButton onClick={() => handleFavorite(user, index)}>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
