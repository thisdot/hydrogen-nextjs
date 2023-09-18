'use client';

import { IconClose } from '@/components';
import { Link } from '@/components/Link';
import { Text } from '@/components/Text';
import { Disclosure } from '@headlessui/react';
import Image from 'next/image';
import clsx from 'clsx';

function InstructorsDetail({
	title,
	instructors,
	learnMore,
}: {
	title: string;
	instructors: {name: string, src: string, image: string}[];
	learnMore?: string;
}) {

	return (
		<Disclosure key={title} as="div" className="grid w-full gap-2" defaultOpen>
			{({ open }) => (
				<>
					<Disclosure.Button className="text-left">
						<div className="flex justify-between">
							<Text size="lead" as="h4">
								{title}
							</Text>
							<IconClose
								className={clsx(
									'transition-transform transform-gpu duration-200',
									!open && 'rotate-[45deg]'
								)}
							/>
						</div>
					</Disclosure.Button>

					<Disclosure.Panel className={'pb-4 pt-2 grid gap-2'}>
				{instructors.map(i => 
        <div key={i.image} className='flex row items-center my-3'>
          <Image src={i.src} alt={i.name} width={80} height={80} />
          <span className='ml-5'>{i.name}</span>
        </div>)}
						{learnMore && (
							<div className="">
								<Link
									className="pb-px border-b border-primary/30 text-primary/50"
									href={learnMore}
								>
									Learn more
								</Link>
							</div>
						)}
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}

export default InstructorsDetail;
