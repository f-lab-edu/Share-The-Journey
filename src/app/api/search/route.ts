import { PlaceDetailProps } from '@/types/place';

export const dynamic = 'force-dynamic';

const places: PlaceDetailProps[] = [
  {
    imgUrl: '/1.jpg',
    name: '개똥이네 캠핑장',
    location: '강원도 평창',
    price: 0,
    score: 4.5,
    id: '1',
    registrant: '개똥이',
    review: '이곳에 오시면 정말 많은 별을 관찰할 수 있습니다!',
    amenities: ['화장실', '주차장'],
  },
  {
    imgUrl: '/2.jpg',
    name: '계곡이 이쁜 캠핑장',
    location: '강원도 홍천',
    price: 300,
    score: 3.9,
    id: '2',
    registrant: '푸들',
    review: '이곳은 계곡이 바로 옆에 있어 물놀이하기에 정말 좋습니다!',
    amenities: ['화장실', '주차장', '수영장'],
  },
  {
    imgUrl: '/3.jpg',
    name: '산공기 캠핑장',
    location: '경기도 가평',
    price: 1000,
    score: 4.8,
    id: '3',
    registrant: '진도',
    review: '이곳은 공기가 정말 좋고 풍경이 너무 이쁜 곳입니다!',
    amenities: ['화장실', '주차장', '바베큐'],
  },
];

export async function POST(request: Request) {
  try {
    const { query } = await request.json();

    if (!query) {
      return new Response(
        JSON.stringify({ error: '일치하는 검색 결과가 없습니다.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const filteredPlaces = places.filter((place) => place.name.includes(query));

    return new Response(JSON.stringify({ data: filteredPlaces }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
