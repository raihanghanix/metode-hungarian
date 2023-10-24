// Link program: https://metode-hungarian-client.netlify.app/

/* eslint-disable react-hooks/exhaustive-deps */

// Mengimpor dua function dari library React
import { useEffect, useState } from "react";

// Nama baris dan kolom
const namaBaris = "Pekerjaan";
const namaKolom = "Karyawan";

// Inisial nama baris dan kolom
const initialBaris = namaBaris[0]; // P
const initialKolom = namaKolom[0]; // K

// Main function (App) yang akan menampilkan HTML
// Berisi beberapa state dan function yang mengatur logika program
// Function App akan re-render ketika salah satu state berubah,
// ini berfungsi untuk mengupdate tampilan HTML
function App() {
  // const [namaState, setState] = useState(nilaiAwalState);
  const [jumlahBaris, setJumlahBaris] = useState(2);
  const [kolom, setKolom] = useState({});
  const [data, setData] = useState({ row: [], col: [], val: [], total: [] });
  const [arr, setArr] = useState([]);
  const [tipe, setTipe] = useState("max");
  const [loading, setLoading] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showNav, setShowNav] = useState(false);

  // Function untuk mengubah state `kolom` ketika input dirubah
  function handleChange(e) {
    setKolom((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleClick() {
    // Insialisasi matriks
    const matrix = [];

    // Loop untuk merubah string menjadi array dengan tipe data number
    // Contoh: "-41,32,25" menjadi [41, 32, 25]
    for (let i in kolom) {
      // Split string dengan koma sebagai pemisah
      // Contoh: "41,32,25" menjadi ["41", "32", "25"]
      let split = kolom[i].split(",");
      let newArr = [];
      for (let i in split) {
        // Push angka ke array, dan merubah tipe data string menjadi number
        // Semua angka diubah menjadi positif atau absolut dengan Math.abs
        newArr.push(Math.abs(Number(split[i])));
      }
      // Push array ke matrix yang akan dikirim ke server
      matrix.push(newArr);
    }

    // Jika length matrix nol (matrix kosong), maka return
    if (matrix.length === 0) return;

    // Loop untuk mengecek apakah jumlah angka pada masing-masing baris sama
    for (let i in matrix) {
      if (matrix[i].length < Number(jumlahBaris))
        return alert(`Angka pada baris ke-${Number(i) + 1} kurang!`);
      if (matrix[i].length > Number(jumlahBaris))
        return alert(`Angka pada baris ke-${Number(i) + 1} berlebih!`);
    }

    // Jika jumlah angka pada masing-masing baris tidak sama dengan jumlah baris,
    // maka return sebuah alert dengan pesan
    if (matrix.length !== Number(jumlahBaris))
      return alert(
        `Jumlah angka tidak sama dengan jumlah baris (${jumlahBaris})`
      );

    // Set state `setArr` dengan matrix sebelumnya
    setArr(matrix);

    // Set state `loading` menjadi true, untuk menampilkan loading, kemudian
    // melakukan request data dari server dengan method POST dan content-type JSON
    // dan merubah value javascript object menjadi JSON string dengan JSON.stringify
    setLoading(true);
    fetch("https://raihanghanix.pythonanywhere.com/api", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      // Berisi matrix dan tipe optimasi (maksimasi atau minimasi)
      body: JSON.stringify({ data: matrix, type: tipe }),
    })
      // Merubah response dari server menjadi JSON
      .then((response) => response.json())
      // Set state `data` dengan response dari server
      .then((data) => setData(data.data))
      // Jika terjadi error, maka return alert dengan pesan error
      .catch((err) => {
        return alert(err);
      })
      // Set state `loading` menjadi false, untuk menghilangkan loading
      .finally(() => setLoading(false));
  }

  // Jika state `jumlahBaris` berubah, maka panggil function setData dan setKolom
  // Dengan kata lain, reset state `data` dan `kolom` jika `jumlahBaris` berubah
  useEffect(() => {
    setData({ row: [], col: [], val: [], total: [] });
    setKolom({});
  }, [jumlahBaris]);

  // Jika state `tipe` berubah, maka panggil function handleClick
  useEffect(() => {
    handleClick();
  }, [tipe]);

  // Return HTML untuk ditampilkan
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full h-full rounded-lg shadow-lg flex lg:flex-row flex-col bg-white opacity-100 relative">
        {/* Navigasi desktop */}
        <div className="flex-initial max-lg:hidden border-r border-r-black p-8 flex flex-col gap-4 overflow-auto">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl">Metode Penugasan</h1>
            <p className="text-sm text-neutral-500">Metode Hungarian</p>
            <p className="text-sm text-neutral-500">
              {initialBaris} ({namaBaris}) {initialKolom} ({namaKolom})
            </p>
          </div>
          <div className="w-full">
            <select
              className="w-full border border-black p-2 rounded-lg"
              name="tipe"
              defaultValue={"max"}
              onChange={(e) => setTipe(e.target.value)}
            >
              <option value="max">Maksimasi</option>
              <option value="min">Minimasi</option>
            </select>
          </div>
          <div className="flex gap-5 items-center">
            <p>n{initialBaris}</p>
            <input
              className="p-2 rounded-lg w-full"
              type="number"
              min={2}
              max={10}
              value={jumlahBaris}
              onChange={(e) => setJumlahBaris(e.target.value)}
              placeholder={`Jumlah ${namaBaris}...`}
            />
          </div>
          <hr className="border-black" />
          <div className="flex flex-col gap-2">
            {Array.from({ length: jumlahBaris }).map((jb, i) => (
              <div key={i} className="flex gap-2 items-center">
                <p>
                  {initialBaris}
                  {i + 1}
                </p>
                <input
                  className="p-2 rounded-lg text-sm w-full"
                  key={i}
                  type="text"
                  name={i}
                  value={kolom[i] || ""}
                  onChange={(e) => handleChange(e)}
                  autoComplete="off"
                  placeholder={`Masukkan angka, maks. ${jumlahBaris}`}
                />
              </div>
            ))}
          </div>
          {jumlahBaris && (
            <>
              <button
                className="bg-black p-2 text-white rounded-lg"
                onClick={() => handleClick()}
                disabled={loading}
              >
                {loading ? "Loading..." : "Hitung"}
              </button>
            </>
          )}
        </div>
        {/* Navigasi mobile */}
        <div className="flex-initial lg:hidden p-4 flex flex-col gap-4 overflow-auto border-b border-b-black">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-4">
              <button
                className="bg-black text-white p-4 w-16 h-16 font-bold text-3xl/none cursor-pointer"
                onClick={() => setShowNav((prev) => !prev)}
              >
                ≡
              </button>
              <div className="flex w-full justify-between items-center gap-2">
                <div>
                  <h1 className="font-bold text-2xl max-sm:text-base">
                    Metode Penugasan
                  </h1>
                  <p className="text-sm text-neutral-500">Metode Hungarian</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500 max-sm:hidden">
                    {initialBaris} ({namaBaris}) {initialKolom} ({namaKolom})
                  </p>
                </div>
              </div>
            </div>
          </div>
          {showNav && (
            <>
              <div className="w-full">
                <select
                  className="w-full border border-black p-2 rounded-lg"
                  name="tipe"
                  defaultValue={"max"}
                  onChange={(e) => setTipe(e.target.value)}
                >
                  <option value="max">Maksimasi</option>
                  <option value="min">Minimasi</option>
                </select>
              </div>
              <div className="flex gap-5 items-center">
                <p>n{initialBaris}</p>
                <input
                  className="p-2 rounded-lg w-full"
                  type="number"
                  min={2}
                  max={10}
                  value={jumlahBaris}
                  onChange={(e) => setJumlahBaris(e.target.value)}
                  placeholder={`Jumlah ${namaBaris}...`}
                />
              </div>

              <hr className="border-black" />
              <div className="flex flex-col gap-2">
                {Array.from({ length: jumlahBaris }).map((jb, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <p>
                      {initialBaris}
                      {i + 1}
                    </p>
                    <input
                      className="p-2 rounded-lg text-sm w-full"
                      key={i}
                      type="text"
                      name={i}
                      value={kolom[i] || ""}
                      onChange={(e) => handleChange(e)}
                      autoComplete="off"
                      placeholder={`Masukkan angka, maks. ${jumlahBaris}`}
                    />
                  </div>
                ))}
              </div>
              {jumlahBaris && (
                <>
                  <button
                    className="bg-black p-2 text-white rounded-lg"
                    onClick={() => handleClick()}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Hitung"}
                  </button>
                </>
              )}
            </>
          )}
        </div>
        {loading ? (
          <div className="flex-1 max-lg:p-4 p-8 flex flex-col gap-4 justify-center items-center overflow-auto">
            <img width={128} src="/loader.svg" alt="loading" />
          </div>
        ) : (
          <div className="flex-1 max-lg:p-4 p-8 flex flex-col gap-4 overflow-auto">
            {data.row.length === 0 && (
              <div className="w-full h-full">
                <div className="flex h-full justify-center items-center text-center flex-col gap-4">
                  <p className="font-bold text-2xl">Data Kosong</p>
                  <p className="text-xl animate-pulse">
                    Silahkan masukkan data.
                  </p>
                </div>
              </div>
            )}
            {data.row.length !== 0 && (
              <div className="w-full">
                <div className="flex flex-col gap-2 mb-4">
                  <h1 className="font-bold text-2xl">Hasil</h1>
                </div>
                <div className="mb-4 flex-col w-full">
                  <div className="mb-2">
                    <h1 className="text-center pl-8 font-bold text-sm">
                      {namaKolom} ({initialKolom})
                    </h1>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <h1 id="vertical" className="font-bold text-sm">
                      {namaBaris} ({initialBaris})
                    </h1>
                    <table className="w-full border-collapse">
                      <tbody>
                        {arr.map((el, i) => (
                          <tr key={i} className="flex">
                            {el.map((e, i) => (
                              <td
                                className="w-full py-2 px-4 text-center border border-black"
                                key={i}
                              >
                                {e}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="w-full">
                  <table className="border-collapse w-full text-sm">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 text-center border border-black">
                          {namaBaris}
                        </th>
                        <th className="py-2 px-4 text-center border border-black">
                          {namaKolom}
                        </th>
                        <th className="py-2 px-4 text-center border border-black">
                          {tipe === "max" ? "Keuntungan" : "Biaya Minimal"}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.val.map((d, i) => (
                        <tr key={i}>
                          <td className="py-2 px-4 text-center border border-black">
                            {initialBaris}
                            {data.row[i] + 1}
                          </td>
                          <td className="py-2 px-4 text-center border border-black">
                            {initialKolom}
                            {data.col[i] + 1}
                          </td>
                          <td className="py-2 px-4 text-center border border-black">
                            {data.val[i]}
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td
                          colSpan={2}
                          className="py-2 px-4 text-center border border-black font-bold"
                        >
                          Total
                        </td>
                        <td className="py-2 px-4 text-center border border-black">
                          {data.total[data.total.length - 1]}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-2">
                  {data.val.map((d, i) => (
                    <p key={i}>
                      ({initialBaris}
                      {data.row[i] + 1}, {initialKolom}
                      {data.col[i] + 1}) &rarr; {d}
                    </p>
                  ))}
                  {data.total.length !== 0 &&
                    (tipe === "max" ? (
                      <p>
                        Jumlah Keuntungan = {data.total[data.total.length - 1]}
                      </p>
                    ) : (
                      <p>
                        Jumlah Biaya Minimal ={" "}
                        {data.total[data.total.length - 1]}
                      </p>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="absolute right-0 bottom-0 p-8">
        <div
          className="font-bold text-white text-xl bg-black p-4 rounded-full w-12 h-12 flex items-center justify-center shadow-md cursor-pointer"
          onClick={() => setShowHelp(true)}
        >
          ?
        </div>
      </div>
      {showHelp && (
        <div className="absolute w-screen h-screen z-10 flex justify-center items-center">
          <div
            className="w-full h-full z-10 bg-black opacity-50 relative"
            onClick={() => setShowHelp(false)}
          />
          <div className="bg-white p-8 z-20 absolute sm:max-w-xl flex flex-col gap-8 shadow-md max-sm:w-full max-sm:h-full">
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-xl">Cara Penggunaan</h1>
              <button
                className="font-bold flex justify-center items-center text-2xl/none w-12 h-12 bg-black text-white rounded-full"
                onClick={() => setShowHelp(false)}
              >
                X
              </button>
            </div>
            <div className="flex justify-start items-center gap-4 border border-black p-4 max-sm:flex-col">
              <img className="object-contain" src="/step1.jpg" alt="" />
              <p>Pilih jenis optimasi, maksimasi atau minimasi.</p>
            </div>
            <div className="flex justify-start items-center gap-4 border border-black p-4 max-sm:flex-col">
              <img className="object-contain" src="/step2.jpg" alt="" />
              <p>Tentukan jumlah baris.</p>
            </div>
            <div className="flex justify-start items-center gap-4 border border-black p-4 max-sm:flex-col">
              <img className="object-contain" src="/step3.jpg" alt="" />
              <div className="flex flex-col gap-2">
                <p>Masukkan angka pada masing-masing baris.</p>
                <p>Jumlah angka harus sama dengan jumlah baris.</p>
                <p> Pastikan memisahkan angka dengan koma dan tanpa spasi.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Ekspor main function (App) untuk digunakan di file main.jsx
export default App;
