import React, { useState, useEffect } from "react";
import indonesiaData from "../../../assets/location/indonesia_data.json";

type Provinsi = { id: string; nama: string };
type Kabupaten = { id: string; nama: string };
type Kecamatan = { id: string; nama: string };
type Kelurahan = { id: string; nama: string };

type IndonesiaData = {
  provinsi: Provinsi[];
  kabupaten: Record<string, Kabupaten[]>;
  kecamatan: Record<string, Kecamatan[]>;
  kelurahan: Record<string, Kelurahan[]>;
};
type SelectLocationProps = {
  onLocationChange: (location: string) => void;
};

const SelectLocation: React.FC<SelectLocationProps> = ({
  onLocationChange,
}) => {
  const data: IndonesiaData = indonesiaData as IndonesiaData;

  const [provinsi, setProvinsi] = useState<Provinsi[]>([]);
  const [kabupaten, setKabupaten] = useState<Kabupaten[]>([]);
  const [kecamatan, setKecamatan] = useState<Kecamatan[]>([]);
  const [kelurahan, setKelurahan] = useState<Kelurahan[]>([]);

  const [selectedProvinsi, setSelectedProvinsi] = useState<string>("");
  const [selectedKabupaten, setSelectedKabupaten] = useState<string>("");
  const [selectedKecamatan, setSelectedKecamatan] = useState<string>("");
  const [selectedKelurahan, setSelectedKelurahan] = useState<string>("");

  useEffect(() => {
    setProvinsi(data.provinsi);
  }, []);

  useEffect(() => {
    onLocationChange(
      `${selectedProvinsi}, ${selectedKabupaten}, ${selectedKecamatan}, ${selectedKelurahan}`
    );
  }, []);

  const handleProvinsiChange = (provinsiId: string) => {
    setSelectedProvinsi(provinsiId);
    setKabupaten(data.kabupaten[provinsiId] || []);
    setKecamatan([]);
    setKelurahan([]);
    setSelectedKabupaten("");
    setSelectedKecamatan("");
    setSelectedKelurahan("");
  };

  const handleKabupatenChange = (kabupatenId: string) => {
    setSelectedKabupaten(kabupatenId);
    setKecamatan(data.kecamatan[kabupatenId] || []);
    setKelurahan([]);
    setSelectedKecamatan("");
    setSelectedKelurahan("");
  };

  const handleKecamatanChange = (kecamatanId: string) => {
    setSelectedKecamatan(kecamatanId);
    setKelurahan(data.kelurahan[kecamatanId] || []);
    setSelectedKelurahan("");
  };

  const handleKelurahanChange = (kelurahanId: string) => {
    setSelectedKelurahan(kelurahanId);
  };

  return (
    <div className="">
      {/* Provinsi */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Provinsi
        </label>
        <select
          value={selectedProvinsi}
          onChange={(e) => handleProvinsiChange(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">- Pilih Provinsi -</option>
          {provinsi.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nama}
            </option>
          ))}
        </select>
      </div>

      {/* Kabupaten */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Kabupaten
        </label>
        <select
          value={selectedKabupaten}
          onChange={(e) => handleKabupatenChange(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">- Pilih Kabupaten -</option>
          {kabupaten.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nama}
            </option>
          ))}
        </select>
      </div>

      {/* Kecamatan */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Kecamatan
        </label>
        <select
          value={selectedKecamatan}
          onChange={(e) => handleKecamatanChange(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">- Pilih Kecamatan -</option>
          {kecamatan.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nama}
            </option>
          ))}
        </select>
      </div>

      {/* Kelurahan */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Kelurahan
        </label>
        <select
          value={selectedKelurahan}
          onChange={(e) => handleKelurahanChange(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">- Pilih Kelurahan -</option>
          {kelurahan.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nama}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectLocation;
