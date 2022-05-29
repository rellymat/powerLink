import UserList from "components/UserList";
import Text from "components/Text";
import * as S from "../Home/style";
import { useEffect, useState } from "react";

const favoritesKey = "favorites"

const FavoriteUsers = () => {
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const favorites = localStorage.getItem(favoritesKey)
        if (favorites) {
            setUsers([...Object.values(JSON.parse(favorites))])
        }
        setIsLoading(false)
    }, [])

    return (
        <S.Home>
            <S.Content>
                <S.Header>
                    <Text size="64px" bold>
                        PplFinder
                    </Text>
                </S.Header>
                <UserList users={users} isLoading={isLoading} isFavoritePage={true} />
            </S.Content>
        </S.Home>
    );
};

export default FavoriteUsers;
