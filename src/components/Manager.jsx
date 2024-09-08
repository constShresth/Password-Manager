import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const [bool, setBool] = useState(false);
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    setPasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const toggle = () => {
    setBool((value) => !value);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const savePassword = async () => {

    if (form.id) {
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: form.id }),
      });
    }

    setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);

    await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...form, id: uuidv4() }),
    });
    setForm({ site: "", username: "", password: "" });
    toast.success("Password saved successfully");
  };

  const editPassword = (id) => {
    setForm({ ...passwordArray.filter((item) => item.id === id)[0], id: id });
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const deletePassword = async (id) => {
    let c = confirm("Do you really want to delete the password??");
    if (c) {
      
      let result = await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      console.log(result);
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      toast.error("Password deleted");
    }
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard");
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="container mx-auto">
        <h1 className="flex items-center justify-center text-4xl">KeyKeep</h1>
        <p className="flex items-center justify-center">
          Your own password manager
        </p>
        <div className="flex flex-col items-center mx-auto">
          <input
            type="text"
            value={form.site}
            name="site"
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full w-3/4 m-2 p-1 px-4 bg-zinc-200 border-gray-400 border-2"
          />
          <input
            type="text"
            value={form.username}
            name="username"
            onChange={handleChange}
            placeholder="Enter username"
            className="rounded-full w-3/4 m-2 p-1 px-4 bg-zinc-200 border-gray-400 border-2"
          />

          <div className="flex items-center m-2 w-3/4  bg-zinc-200 border-gray-400 border-2 rounded-full">
            <input
              type={bool ? "text" : "password"}
              value={form.password}
              name="password"
              onChange={handleChange}
              placeholder="Enter password"
              className=" rounded-full w-full outline-0 py-1 px-4 m-0 bg-zinc-200  "
            />
            <img
              src={bool ? "eye-open.png" : "eye-close.png"}
              alt=""
              className=" w-5 mr-3 cursor-pointer"
              onClick={toggle}
            />
          </div>
          <button
            onClick={savePassword}
            className=" border-teal-300 bg-fuchsia-300 border-2 p-2  rounded-full hover:bg-fuchsia-200 flex justify-center items-center"
          >
            <lord-icon
              src="https://cdn.lordicon.com/zrkkrrpl.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>

        <h2 className="flex justify-center text-2xl font-bold py-2">
          Your passwords
        </h2>
        {passwordArray.length === 0 ? (
          <div className="flex justify-center py-2">No passwords to show</div>
        ) : (
          <table className="table-auto mx-auto w-3/4 rounded-md overflow-hidden mb-20 ">
            <thead className=" bg-zinc-200">
              <tr>
                <th>Site</th>
                <th>Username</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className=" bg-fuchsia-50">
              {passwordArray.map((items, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center w-1/5">
                      <a href={items.site} target="_blank">
                        {items.site}
                      </a>
                    </td>
                    <td
                      className="text-center w-1/5 cursor-pointer"
                      onClick={() => copyText(items.username)}
                    >
                      {items.username}
                    </td>
                    <td
                      className="text-center w-1/5 cursor-pointer"
                      onClick={() => copyText(items.password)}
                    >
                      {"*".repeat(items.password.length)}
                    </td>
                    <td className="text-center w-1/5 cursor-pointer">
                      <span
                        className="mx-1"
                        onClick={() => editPassword(items.id)}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/gwlusjdu.json"
                          trigger="hover"
                          style={{ width: "18px", height: "18px" }}
                        ></lord-icon>
                      </span>
                      <span
                        className="mx-1"
                        onClick={() => deletePassword(items.id)}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/wpyrrmcq.json"
                          trigger="hover"
                          style={{ width: "18px", height: "18px" }}
                        ></lord-icon>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Manager;
