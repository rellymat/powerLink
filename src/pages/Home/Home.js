import React, { useState } from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";

const Home = () => {
  const { users, isLoading, fetchUsers } = usePeopleFetch();
  const [counter, setCounter] = useState(2)

  const handleBottom = () => {
  fetchUsers(counter)
  setCounter(prevCounter => prevCounter + 1)
  }

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList users={users} isLoading={isLoading} handleBottom={handleBottom}/>
      </S.Content>
    </S.Home>
  );
};

export default Home;
