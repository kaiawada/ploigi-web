'use client'

type User = {
  id: number
  email: string
}

export default function DeleteUserButton({
  user,
  onDelete
}: {
  user: User
  onDelete: (formData: FormData) => Promise<{ error?: string; success?: boolean }>
}) {
  return (
    <form
      action={async (formData) => {
        await onDelete(formData)
      }}
      className="inline"
    >
      <input type="hidden" name="id" value={user.id} />
      <button
        type="submit"
        className="text-red-600 hover:text-red-800 font-medium text-sm"
        onClick={(e) => {
          if (!confirm(`${user.email} を削除してもよろしいですか？`)) {
            e.preventDefault()
          }
        }}
      >
        削除
      </button>
    </form>
  )
}
