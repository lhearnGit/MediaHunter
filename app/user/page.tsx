import { auth } from "@/auth";
import ProfileTestComponent from "./_components/ProfileTestComponent";
import { UserCollections } from "@/lib/hooks/profile/useProfileList";

const UserDashboard = async () => {
  const session = await auth();
  if (!session) return <div>not authenticated</div>;
  const profile: UserCollections = await fetch(
    `${process.env.SERVER_ROOT}/api/user/${session.user.id}`
  ).then((res) => res.json());

  console.log(profile);
  return (
    <div>
      <div>Authenticated</div>
      <div>
        <ProfileTestComponent collection={profile} />
      </div>
    </div>
  );
};

export default UserDashboard;
