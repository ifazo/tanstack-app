import { StarIcon } from '@heroicons/react/16/solid'
import { Product } from '../types'
import { addToCart } from '../store'
import toast from 'react-hot-toast'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductDetails({ product }: { product: Product }) {
    
    return (
        <div className="bg-white">
            <div className="pt-6 pb-16 sm:pb-24">
                <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ol role="list" className="flex items-center space-x-4">
                        <li key={product.id}>
                            <div className="flex items-center">
                                <a href={product.id.toString()} className="mr-4 text-sm font-medium text-gray-900">
                                    {product.category.toUpperCase()}
                                </a>
                                <svg
                                    viewBox="0 0 6 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                    className="h-5 w-auto text-gray-300"
                                >
                                    <path d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z" fill="currentColor" />
                                </svg>
                            </div>
                        </li>
                        <li className="text-sm">
                            <a href={product.id.toString()} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                {product.brand}
                            </a>
                        </li>
                    </ol>
                </nav>
                <div className="mt-8 max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
                        <div className="lg:col-start-8 lg:col-span-5">
                            <div className="flex justify-between">
                                <h1 className="text-xl font-medium text-gray-900">{product.title}</h1>
                                <p className="text-xl font-medium text-gray-900">${product.price}</p>
                            </div>
                            {/* Reviews */}
                            <div className="mt-4">
                                <h2 className="sr-only">Reviews</h2>
                                <div className="flex items-center">
                                    <p className="text-sm text-gray-700">
                                        {product.rating}
                                        <span className="sr-only"> out of 5 stars</span>
                                    </p>
                                    <div className="ml-1 flex items-center">
                                        {[0, 1, 2, 3, 4].map((rate) => (
                                            <StarIcon
                                                key={rate}
                                                className={classNames(
                                                    product.rating > rate ? 'text-yellow-400' : 'text-gray-200',
                                                    'h-5 w-5 flex-shrink-0'
                                                )}
                                                aria-hidden="true"
                                            />
                                        ))}
                                    </div>
                                    <div aria-hidden="true" className="ml-4 text-sm text-gray-300">
                                        ·
                                    </div>
                                    <div className="ml-4 flex">
                                        <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                            See all {product.stock} reviews
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Image gallery */}
                        <div className="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3">
                            <h2 className="sr-only">Images</h2>

                            <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className='lg:col-span-2 lg:row-span-2'
                                />
                                <img
                                    src={product.images[0]}
                                    alt={product.title}
                                    className='hidden lg:block rounded-lg'
                                />
                                <img
                                    src={product.images[1]}
                                    alt={product.title}
                                    className='hidden lg:block rounded-lg'
                                />
                            </div>
                        </div>

                        <div className="mt-8 lg:col-span-5">
                            <form>
                                {/* Color picker */}
                                <div>
                                    <h2 className="text-sm font-medium text-gray-900">Color</h2>

                                    {/* <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-2">
                                        <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                                        <div className="flex items-center space-x-3">
                                            {product.colors.map((color) => (
                                                <RadioGroup.Option
                                                    key={color.name}
                                                    value={color}
                                                    className={({ active, checked }) =>
                                                        classNames(
                                                            color.selectedColor,
                                                            active && checked ? 'ring ring-offset-1' : '',
                                                            !active && checked ? 'ring-2' : '',
                                                            '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                                                        )
                                                    }
                                                >
                                                    <RadioGroup.Label as="p" className="sr-only">
                                                        {color.name}
                                                    </RadioGroup.Label>
                                                    <span
                                                        aria-hidden="true"
                                                        className={classNames(
                                                            color.bgColor,
                                                            'h-8 w-8 border border-black border-opacity-10 rounded-full'
                                                        )}
                                                    />
                                                </RadioGroup.Option>
                                            ))}
                                        </div>
                                    </RadioGroup> */}
                                </div>

                                {/* Size picker */}
                                <div className="mt-8">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-sm font-medium text-gray-900">Save</h2>
                                        <button
                                            type='button'
                                            onClick={() => {
                                                addToCart(product)
                                                // toast.success('Added to wishlist')
                                            }
                                            }
                                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                            Add to Cart
                                        </button>
                                    </div>

                                    {/* <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-2">
                                        <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                                        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                                            {product.sizes.map((size) => (
                                                <RadioGroup.Option
                                                    key={size.name}
                                                    value={size}
                                                    className={({ active, checked }) =>
                                                        classNames(
                                                            size.inStock ? 'cursor-pointer focus:outline-none' : 'opacity-25 cursor-not-allowed',
                                                            active ? 'ring-2 ring-offset-2 ring-indigo-500' : '',
                                                            checked
                                                                ? 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700'
                                                                : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                                                            'border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1'
                                                        )
                                                    }
                                                    disabled={!size.inStock}
                                                >
                                                    <RadioGroup.Label as="p">{size.name}</RadioGroup.Label>
                                                </RadioGroup.Option>
                                            ))}
                                        </div>
                                    </RadioGroup> */}
                                </div>

                                <button
                                    type='button'
                                    onClick={() => {
                                        addToCart(product)
                                        toast.success('Added to cart')
                                    }}
                                    className="mt-8 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Add to cart
                                </button>
                            </form>

                            {/* Product details */}
                            <div className="mt-10">
                                <h2 className="text-sm font-medium text-gray-900">Description</h2>

                                <div className="mt-4 prose prose-sm text-gray-500">
                                    {product.description}
                                </div>

                            </div>

                            <div className="mt-8 border-t border-gray-200 pt-8">
                                <h2 className="text-sm font-medium text-gray-900">Rating &amp; Review</h2>

                                <div className="mt-4 prose prose-sm text-gray-500">
                                    {/* <ul role="list">
                                        {product.details.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul> */}
                                </div>
                            </div>

                            {/* Policies */}
                            <section aria-labelledby="policies-heading" className="mt-10">
                                <h2 id="policies-heading" className="sr-only">
                                    Our Policies
                                </h2>

                                <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                                    {/* {policies.map((policy) => (
                                        <div key={policy.name} className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                                            <dt>
                                                <policy.icon className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                                <span className="mt-4 text-sm font-medium text-gray-900">{policy.name}</span>
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-500">{policy.description}</dd>
                                        </div>
                                    ))} */}
                                </dl>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
