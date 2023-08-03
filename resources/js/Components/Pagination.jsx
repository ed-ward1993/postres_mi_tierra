import React from 'react';
import { Link } from '@inertiajs/react';
import {decode} from 'html-entities';

export default function Pagination({ links }) {

    function getClassName(active) {
        if(active) {
            return "mr-1 mb-1 px-3 py-2 text-xs leading-4 border rounded focus:border-primary focus:text-primary bg-blue-700 text-white";
        } else{
            return "mr-1 mb-1 px-3 py-2 text-xs leading-4 border rounded hover:bg-white focus:border-primary focus:text-primary";
        }
    }

    return (
        links.length > 3 && (
            <div className="mb-4">
                <div className="flex flex-wrap mt-8">
                    {links.map((link, key) => (
                        link.url === null ?
                            (<div key={key}
                                className="mr-1 mb-1 px-3 py-2 text-xs leading-4 text-gray-400 border rounded"
                            >{decode(link.label.replace("Next","").replace("Previous",""))}</div>) :

                            (<Link
                                title={decode(link.label)}
                                key={key}
                                className={getClassName(link.active)+(!link.label.includes('Next') && !link.label.includes('Previous')?" hidden lg:inline":"")}
                                href={ link.url }
                                preserveScroll={true}
                                preserveState={true}
                            >{decode(link.label.replace("Next","").replace("Previous",""))}</Link>)
                    ))}
                </div>
            </div>
        )
    );
}
