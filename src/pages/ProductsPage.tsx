import { Link } from "@tanstack/react-router"
import { useCategories, useProductsByPage } from "../lib/queries"
import { Product } from "../types"
import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import Pagination from "../components/Pagination"

const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Best Rating', href: '#', current: false },
    { name: 'Newest', href: '#', current: false },
    { name: 'Price: Low to High', href: '#', current: false },
    { name: 'Price: High to Low', href: '#', current: false },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductsPage() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false)
    const limit = 12;
    const [skip, setSkip] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const { data: products, error: productsError } = useProductsByPage(limit, skip)
    const { data: categories, error: categoriesError } = useCategories()
    
    const total = products?.data.total
    const totalPages = Math.ceil(total / limit);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
    const onPageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        setSkip((page - 1) * limit);
    };

    if (!categories) {
        return <div>Categories Loading...</div>
    }
    if (!products) {
        return <div>Products Loading...</div>
    }
    if (categoriesError) {
        return <div>Error: {categoriesError.message}</div>
    }
    if (productsError) {
        return <div>Error: {productsError.message}</div>
    }

    return (
        <div className="bg-white">
            <div>
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                        <button
                                            type="button"
                                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <form className="mt-4 border-t border-gray-200">
                                        <h3 className="sr-only">Categories</h3>
                                        <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                                            {categories?.data.map((category: string, index: number) => (
                                                <li key={index}>
                                                    <a href={category} className="block px-2 py-3">
                                                        {category}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Products List</h1>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        Sort
                                        <ChevronDownIcon
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {sortOptions.map((option) => (
                                                <Menu.Item key={option.name}>
                                                    {({ active }) => (
                                                        <a
                                                            href={option.href}
                                                            className={classNames(
                                                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                            {option.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>

                            <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                                <span className="sr-only">View grid</span>
                                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="py-6">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden lg:block">
                                <h3 className="sr-only">Categories</h3>
                                <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                                    {categories?.data.map((category: string, index: number) => (
                                        <li key={index}>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    console.log(category)
                                                }}
                                            >
                                                {category}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </form>

                            {/* Product grid */}
                            <div className="lg:col-span-3">
                                <div className="bg-white">
                                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                                        <h2 className="sr-only">Products</h2>

                                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                                            {
                                                products?.data.products.map((product: Product) => {
                                                    return (
                                                        <Link to="/products/$productId" params={{ productId: product.id.toString() }} preload="intent" key={product.id}>
                                                            <div className="group">
                                                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                                                    <img
                                                                        src={product.thumbnail}
                                                                        alt={product.title}
                                                                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                                                                    />
                                                                </div>
                                                                <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
                                                                <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
                                                            </div>
                                                        </Link>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>
                    <Pagination limit={limit} pageNumbers={pageNumbers} currentPage={currentPage} onPageChange={onPageChange} total={total} totalPages={totalPages} />
                </main>
            </div>
        </div>
    )
}
