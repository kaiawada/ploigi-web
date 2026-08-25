import { verifySession } from '@/lib/dal'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { createUserAction, updateUserAction, deleteUserAction } from './actions'
import DeleteUserButton from './DeleteUserButton'

export default async function AdminPage() {
  const user = await verifySession()

  if (!user || user.role !== 'admin') {
    redirect('/login')
  }

  // すべてのユーザーを取得
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">ユーザー管理</h1>

        {/* ユーザー追加フォーム */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">ユーザーを追加</h2>
          <form
            action={async (formData) => {
              'use server'
              await createUserAction(formData)
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                メールアドレス
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                パスワード
              </label>
              <input
                type="password"
                name="password"
                required
                minLength={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ロール
              </label>
              <select
                name="role"
                defaultValue="user"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="user">一般ユーザー</option>
                <option value="admin">管理者</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
            >
              ユーザーを追加
            </button>
          </form>
        </div>

        {/* ユーザー一覧 */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  メールアドレス
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  ロール
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  作成日時
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users.map((u) => (
                <UserRow
                  key={u.id}
                  user={u}
                  onUpdate={updateUserAction}
                  onDelete={deleteUserAction}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ユーザー行コンポーネント
function UserRow({
  user,
  onUpdate,
  onDelete
}: {
  user: any
  onUpdate: any
  onDelete: any
}) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 text-sm text-gray-900">{user.id}</td>
      <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
      <td className="px-6 py-4 text-sm text-gray-900">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          user.role === 'admin'
            ? 'bg-purple-100 text-purple-800'
            : 'bg-green-100 text-green-800'
        }`}>
          {user.role === 'admin' ? '管理者' : '一般ユーザー'}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-900">
        {user.createdAt.toLocaleString('ja-JP')}
      </td>
      <td className="px-6 py-4 text-sm space-x-2">
        <EditUserButton user={user} onUpdate={onUpdate} />
        <DeleteUserButton user={user} onDelete={onDelete} />
      </td>
    </tr>
  )
}

// ユーザー編集ボタン・モーダル
function EditUserButton({ user, onUpdate }: { user: any; onUpdate: any }) {
  return (
    <details className="inline">
      <summary className="cursor-pointer text-blue-600 hover:text-blue-800 font-medium">
        編集
      </summary>
      <div className="absolute bg-white border border-gray-300 rounded-lg shadow-lg p-4 mt-2 w-80 z-10">
        <h3 className="text-lg font-bold mb-4">ユーザー編集</h3>
        <form action={onUpdate} className="space-y-3">
          <input type="hidden" name="id" value={user.id} />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              メールアドレス
            </label>
            <input
              type="email"
              name="email"
              defaultValue={user.email}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              新しいパスワード（空白の場合は変更しません）
            </label>
            <input
              type="password"
              name="password"
              minLength={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg text-sm transition-colors"
          >
            更新
          </button>
        </form>
      </div>
    </details>
  )
}
