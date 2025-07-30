import React, { useEffect, useState } from "react";
import { getFindNameUser } from "../services/user.services";
import { ListGroup, Image, Spinner, Card } from "react-bootstrap";
import avatar from "../assets/avata.jpg";
import { Link, useSearchParams } from "react-router-dom";

const SearchUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");

  useEffect(() => {
    const fetchUsers = async () => {
      if (!name) {
        setUsers([]);
        return;
      }

      setLoading(true);
      try {
        const res = await getFindNameUser(name);
        console.log(res)
        setUsers(res.data);
      } catch (err) {
        console.error("Lỗi khi tìm user:", err);
        setUsers([]);
      }
      setLoading(false);
    };

    fetchUsers();
  }, [name]);

  return (
    <div className="mb-3 mt-5">
      {loading && <Spinner animation="border" />}
      {!loading && users!=null && (
        <ListGroup className="mt-2">
          {users.map((user) => (
            <ListGroup.Item
              key={user._id}
              className="d-flex align-items-center justify-content-between"
            >
              <div className="d-flex align-items-center">
                <Image
                  src={user.image || avatar}
                  roundedCircle
                  width={40}
                  height={40}
                  className="me-2"
                />
                <Link
                  to={`/SearchUserPage/?name=${user._id}`}
                  className="text-decoration-none"
                >
                  <span>{user.name}</span>
                </Link>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      {!loading && users==null && (
        <Card className="mb-3 mt-5">
          <p className="mt-3 text-muted text-center">
            Không tìm thấy người dùng nào.
          </p>
        </Card>
      )}
    </div>
  );
};

export default SearchUser;
