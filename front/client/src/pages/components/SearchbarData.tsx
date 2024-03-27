import axios from "axios";
import {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

type User = {
    id_user: number;
    name: string;
    avatar: string;
    TwoFactor: boolean;
    secretKey: string|null;
    status_user: string;
  };
function SearchbarData() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [selectedUserIndex, setSelectedUserIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
      const { data } = await axios.get("http://localhost:3000/auth/friends", { withCredentials: true });
      setUsers(data);
    } catch (err) {
    }
    };
    fetchData();
  }, []);
  
  function handelQuerychange(event: ChangeEvent<HTMLInputElement>) {
    const searchTerm = event.target.value.toLowerCase();
    setQuery(searchTerm);

    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm)
    );

    setSearchResults(filteredUsers);
   }

  function handelkeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowUp") {
      setSelectedUserIndex((prevIndex) =>
        prevIndex === -1 ? searchResults.length - 1 : prevIndex - 1
      );
    } else if (event.key === "ArrowDown") {
      setSelectedUserIndex((prevIndex) =>
        prevIndex === searchResults.length - 1 ? -1 : prevIndex + 1
      );
    } else if (event.key === "Enter") {
      if (selectedUserIndex !== -1) {
        const selectedUser = searchResults[selectedUserIndex];
        setQuery("");
        setSelectedUserIndex(-1);
        setSearchResults([]);
        navigate(`/profileFriend/${selectedUser.id_user}`);
      }
    }
  }
  function handelUserClick(user: User) {
    navigate(`/profileFriend/${user.id_user}`);
    setQuery("");
    setSelectedUserIndex(-1);
    setSearchResults([]);
  }
  function scrollActiveUserInToView(index: number) {
    const activeUser = document.getElementById(`user-${index}`);
    if (activeUser) {
      activeUser.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }
  useEffect(() => {
    if (selectedUserIndex !== -1) {
      scrollActiveUserInToView(selectedUserIndex);
    }
  }, [selectedUserIndex]);
  return (
    <>
      <div className="hidden sm:block">
        <input
          type="search"
          name="Serch"
          placeholder="Search for Game..."
          value={query}
          onChange={handelQuerychange}
          onKeyDown={handelkeyDown }
          ref={inputRef}
          className="w-[25rem] p-2 pl-11 py-4 rounded-full bg-[#322f49da] focus:outline-none text-white"
        />
        <button type="submit" className="flex ml-4 -mt-9 text-white ">
          <AiOutlineSearch />
        </button>
        <div className=" relative ">
          <div className=" absolute w-96">
            <div className=" backdrop-blur-sm bg-[#322f49] text-white max-h-40 overflow-y-scroll resultUserContainer rounded-2xl mt-5 shadow-2xl">
              {query !== "" &&
                searchResults.length > 0 &&
                searchResults.map((user, index) => (
                  <div>
                    <div
                      id={`user-${index}`}
                      className={`${
                        selectedUserIndex === index ? " bg-gray-300/30" : ""
                      } py-2 px-4 flex items-center justify-between gap-8 hover:bg-gray-300/30 cursor-pointer rounded-2xl`}
                      key={user.id_user}
                      onClick={() => handelUserClick(user)}
                    >
                      {user.name}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchbarData;
