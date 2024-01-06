import getSpaces, { ISpacesParams } from '@/actions/space.action'
import { getCurrentUser } from '@/lib/getCurrentUser';
import Container from './_components/Container';
import EmptyState from './_components/EmptyState';
import SpaceCard from './_components/spaces/SpaceCard';
import ClientComponents from './_components/ClientComponents';
import Filters from './_components/Filters';

interface HomeProps {
    searchParams: ISpacesParams;
}

const Home = async ({ searchParams }: HomeProps) => {
    const spaces = await getSpaces(searchParams);
    const currentUser = await getCurrentUser();

    if (spaces.length === 0) {
        <EmptyState showReset />
    }
    return (
        <>
            <ClientComponents>
                < Container >
                    <Filters />
                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                        {spaces.map((space) => {
                            return (
                                <SpaceCard currentUser={currentUser} key={space.id} data={space} />
                            )
                        })}
                    </div>
                </Container >
            </ClientComponents>
        </>
    )
}

export default Home;
