export default function UnauthorizedPage() {
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
      <p className="text-gray-600 mt-2">You do not have permission to view this page.</p>
    </div>
  )
}
