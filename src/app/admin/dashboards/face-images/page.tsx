import QrFaceTable from "./compoments/QrFacetable";
export default function FaceManagementPage() {

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Quản lý QR mặt</h2>
      {/* <FaceCardGrid /> */}
      <QrFaceTable />
    </div>
  );
}
