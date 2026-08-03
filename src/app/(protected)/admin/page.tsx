import { verifySession } from '@/lib/dal'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  // 1回目のセッション検証
  const user = await verifySession()

  if (!user) {
    redirect('/login')
  }

  if (user.role !== 'admin') {
    redirect('/dashboard')
  }

  // 2回目のセッション検証（キャッシュから即座に返却）
  const cachedUser = await verifySession()

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">管理者ダッシュボード</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">ユーザー情報</h2>
          <dl className="space-y-2">
            <div>
              <dt className="font-semibold text-gray-700">ID</dt>
              <dd className="text-gray-900">{user.id}</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-700">メールアドレス</dt>
              <dd className="text-gray-900">{user.email}</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-700">ロール</dt>
              <dd className="text-gray-900">{user.role}</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-700">作成日時</dt>
              <dd className="text-gray-900">
                {user.createdAt.toLocaleString('ja-JP')}
              </dd>
            </div>
          </dl>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            💡 verifySession() を複数回呼び出していますが、
            同じリクエスト内では DB に1回だけアクセスしています。
          </p>
        </div>
      </div>
    </div>
  )
}