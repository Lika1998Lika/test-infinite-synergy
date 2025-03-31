import { useGetUsersQuery } from "../../entities/users/api/service"

export function UsersPage() {

  const { data } = useGetUsersQuery();
  return (
    <div>
      <ul>
        {data?.map((item) => (
          <li key={item.id}>{item.jobTitle}</li>
        ))}
      </ul>
    </div>
  )
}
