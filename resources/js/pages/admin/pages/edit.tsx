import { Head, useForm } from '@inertiajs/react';
import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react';
import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import PageController from '@/actions/App/Http/Controllers/Admin/PageController';
import InputError from '@/components/input-error';
import AdminFormPage from '@/components/kiblawan/admin/admin-form-page';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import type { Page } from '@/types';

type ContentMode = 'blocks' | 'html';
type ImagePosition = 'left' | 'right';

type BlockDraft = {
    kicker: string;
    title: string;
    subtitle: string;
    body: string;
    image_position: ImagePosition;
    existing_image: string;
    image: File | null;
};

type StatDraft = {
    label: string;
    value: string;
    suffix: string;
};

type SectorDraft = {
    icon: string;
    title: string;
    description: string;
};

type FactDraft = {
    label: string;
    value: string;
};

function isStoredBlock(value: unknown): value is Record<string, string> {
    if (typeof value !== 'object' || value === null) {
        return false;
    }

    const block = value as Record<string, unknown>;

    return ['image', 'kicker', 'title', 'subtitle', 'body'].every((key) => {
        return typeof block[key] === 'string';
    });
}

function parseStoredBlocks(content: string): BlockDraft[] | null {
    try {
        const parsed: unknown = JSON.parse(content);

        if (!Array.isArray(parsed) || parsed.length === 0) {
            return null;
        }

        if (!parsed.every(isStoredBlock)) {
            return null;
        }

        return parsed.map((block) => ({
            kicker: block.kicker,
            title: block.title,
            subtitle: block.subtitle,
            body: block.body,
            image_position: block.image_position === 'right' ? 'right' : 'left',
            existing_image: block.image,
            image: null,
        }));
    } catch {
        return null;
    }
}

function createBlock(): BlockDraft {
    return {
        kicker: '',
        title: '',
        subtitle: '',
        body: '',
        image_position: 'left',
        existing_image: '',
        image: null,
    };
}

function parseDemographic(content: string): {
    intro: string;
    stats: StatDraft[];
    existingImage: string;
} {
    try {
        const parsed: unknown = JSON.parse(content);

        if (typeof parsed !== 'object' || parsed === null) {
            return { intro: '', stats: [], existingImage: '' };
        }

        const data = parsed as Record<string, unknown>;
        const stats = Array.isArray(data.stats)
            ? data.stats.map((stat) => {
                  const item =
                      typeof stat === 'object' && stat !== null
                          ? (stat as Record<string, unknown>)
                          : {};

                  return {
                      label: typeof item.label === 'string' ? item.label : '',
                      value: typeof item.value === 'string' ? item.value : '',
                      suffix: typeof item.suffix === 'string' ? item.suffix : '',
                  };
              })
            : [];

        return {
            intro: typeof data.intro === 'string' ? data.intro : '',
            stats,
            existingImage: typeof data.image === 'string' ? data.image : '',
        };
    } catch {
        return { intro: '', stats: [], existingImage: '' };
    }
}

function parseSectors(content: string): SectorDraft[] {
    try {
        const parsed: unknown = JSON.parse(content);

        if (typeof parsed !== 'object' || parsed === null) {
            return [];
        }

        const data = parsed as Record<string, unknown>;
        const sectors = Array.isArray(data.sectors) ? data.sectors : [];

        return sectors.map((sector) => {
            const item =
                typeof sector === 'object' && sector !== null
                    ? (sector as Record<string, unknown>)
                    : {};

            return {
                icon: typeof item.icon === 'string' ? item.icon : '',
                title: typeof item.title === 'string' ? item.title : '',
                description:
                    typeof item.description === 'string'
                        ? item.description
                        : typeof item.body === 'string'
                          ? item.body
                          : '',
            };
        });
    } catch {
        return [];
    }
}

function parseGeography(content: string): {
    leftText: string;
    facts: FactDraft[];
    existingMapImage: string;
} {
    try {
        const parsed: unknown = JSON.parse(content);

        if (typeof parsed !== 'object' || parsed === null) {
            return { leftText: '', facts: [], existingMapImage: '' };
        }

        const data = parsed as Record<string, unknown>;
        const facts = Array.isArray(data.facts)
            ? data.facts.map((fact) => {
                  const item =
                      typeof fact === 'object' && fact !== null
                          ? (fact as Record<string, unknown>)
                          : {};

                  return {
                      label: typeof item.label === 'string' ? item.label : '',
                      value: typeof item.value === 'string' ? item.value : '',
                  };
              })
            : [];

        return {
            leftText:
                typeof data.left_text === 'string'
                    ? data.left_text
                    : typeof data.left === 'string'
                      ? data.left
                      : '',
            facts,
            existingMapImage:
                typeof data.map_image === 'string' ? data.map_image : '',
        };
    } catch {
        return { leftText: '', facts: [], existingMapImage: '' };
    }
}

function BlockImagePreview({
    file,
    path,
}: {
    file: File | null;
    path: string;
}) {
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (!file) {
            setPreview(path === '' ? null : path);

            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [file, path]);

    if (!preview) {
        return null;
    }

    return (
        <img
            src={preview}
            alt="Image preview"
            className="mt-1 max-h-48 w-fit rounded-md border object-contain"
        />
    );
}

export default function EditPage({ page }: { page: Page }) {
    const slug = page.slug;
    const isHistory = slug === 'history';
    const isDemographic = slug === 'demographic';
    const isSocio = slug === 'socio-economic';
    const isGeography = slug === 'geography';

    const storedBlocks = isHistory ? parseStoredBlocks(page.content) : null;
    const initialMode: ContentMode = storedBlocks ? 'blocks' : 'html';

    const demo = isDemographic ? parseDemographic(page.content) : null;
    const sectors = isSocio ? parseSectors(page.content) : [];
    const geo = isGeography ? parseGeography(page.content) : null;

    const form = useForm({
        title: page.title,
        mode: initialMode,
        content: isHistory && initialMode === 'html' ? page.content : '',
        blocks: storedBlocks ?? [],
        intro: demo?.intro ?? '',
        stats: demo?.stats ?? [],
        sectors: sectors,
        leftText: geo?.leftText ?? '',
        facts: geo?.facts ?? [],
        image: null as File | null,
        existingImage: demo?.existingImage ?? '',
        mapImage: null as File | null,
        existingMapImage: geo?.existingMapImage ?? '',
    });

    form.transform((data) => {
        const base = { title: data.title };

        if (isHistory) {
            return data.mode === 'blocks'
                ? {
                      ...base,
                      mode: 'blocks',
                      blocks: data.blocks.map((block) => ({
                          kicker: block.kicker,
                          title: block.title,
                          subtitle: block.subtitle,
                          body: block.body,
                          image_position: block.image_position,
                          existing_image: block.existing_image,
                          image: block.image,
                      })),
                  }
                : { ...base, mode: 'html', content: data.content };
        }

        if (isDemographic) {
            return {
                ...base,
                intro: data.intro,
                stats: data.stats,
                image: data.image,
                existing_image: data.existingImage,
            };
        }

        if (isSocio) {
            return {
                ...base,
                sectors: data.sectors,
            };
        }

        if (isGeography) {
            return {
                ...base,
                left_text: data.leftText,
                facts: data.facts,
                map_image: data.mapImage,
                existing_map_image: data.existingMapImage,
            };
        }

        return base;
    });

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        form.put(PageController.update.url(page.slug), {
            forceFormData: true,
        });
    }

    function updateBlock(index: number, patch: Partial<BlockDraft>): void {
        form.setData(
            'blocks',
            form.data.blocks.map((block, blockIndex) =>
                blockIndex === index ? { ...block, ...patch } : block,
            ),
        );
    }

    function addBlock(): void {
        form.setData('blocks', [...form.data.blocks, createBlock()]);
    }

    function removeBlock(index: number): void {
        if (!window.confirm(`Remove block ${index + 1}?`)) {
            return;
        }

        form.setData(
            'blocks',
            form.data.blocks.filter((_, blockIndex) => blockIndex !== index),
        );
    }

    function moveBlock(index: number, offset: -1 | 1): void {
        const targetIndex = index + offset;

        if (targetIndex < 0 || targetIndex >= form.data.blocks.length) {
            return;
        }

        const blocks = [...form.data.blocks];
        const moved = blocks[index];
        blocks[index] = blocks[targetIndex];
        blocks[targetIndex] = moved;

        form.setData('blocks', blocks);
    }

    function blockError(
        index: number,
        field: keyof BlockDraft,
    ): string | undefined {
        return form.errors[`blocks.${index}.${field}`];
    }

    function switchMode(mode: ContentMode): void {
        form.setData('mode', mode);
        form.clearErrors();
    }

    function updateStat(index: number, patch: Partial<StatDraft>): void {
        form.setData(
            'stats',
            form.data.stats.map((stat, statIndex) =>
                statIndex === index ? { ...stat, ...patch } : stat,
            ),
        );
    }

    function addStat(): void {
        form.setData('stats', [
            ...form.data.stats,
            { label: '', value: '', suffix: '' },
        ]);
    }

    function removeStat(index: number): void {
        form.setData(
            'stats',
            form.data.stats.filter((_, statIndex) => statIndex !== index),
        );
    }

    function updateSector(index: number, patch: Partial<SectorDraft>): void {
        form.setData(
            'sectors',
            form.data.sectors.map((sector, sectorIndex) =>
                sectorIndex === index ? { ...sector, ...patch } : sector,
            ),
        );
    }

    function addSector(): void {
        form.setData('sectors', [
            ...form.data.sectors,
            { icon: '', title: '', description: '' },
        ]);
    }

    function removeSector(index: number): void {
        form.setData(
            'sectors',
            form.data.sectors.filter((_, sectorIndex) => sectorIndex !== index),
        );
    }

    function updateFact(index: number, patch: Partial<FactDraft>): void {
        form.setData(
            'facts',
            form.data.facts.map((fact, factIndex) =>
                factIndex === index ? { ...fact, ...patch } : fact,
            ),
        );
    }

    function addFact(): void {
        form.setData('facts', [...form.data.facts, { label: '', value: '' }]);
    }

    function removeFact(index: number): void {
        form.setData(
            'facts',
            form.data.facts.filter((_, factIndex) => factIndex !== index),
        );
    }

    return (
        <>
            <Head title={`Edit ${page.title}`} />
            <AdminFormPage
                title="Edit About Page"
                description={`Update the content for ${page.title}.`}
                backHref={PageController.index.url()}
                backLabel="About Pages"
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="title">
                            Title <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="title"
                            required
                            maxLength={255}
                            value={form.data.title}
                            onChange={(event) =>
                                form.setData('title', event.target.value)
                            }
                            aria-invalid={Boolean(form.errors.title)}
                        />
                        <InputError message={form.errors.title} />
                    </div>

                    {isHistory && (
                        <>
                            <div className="grid gap-2">
                                <Label>Content style</Label>
                                <ToggleGroup
                                    type="single"
                                    variant="outline"
                                    value={form.data.mode}
                                    onValueChange={(value) => {
                                        if (value === 'blocks' || value === 'html') {
                                            switchMode(value);
                                        }
                                    }}
                                    className="w-fit"
                                >
                                    <ToggleGroupItem value="blocks">
                                        Content blocks
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="html">
                                        HTML
                                    </ToggleGroupItem>
                                </ToggleGroup>
                            </div>

                            {form.data.mode === 'blocks' ? (
                                <div className="space-y-4">
                                    <InputError message={form.errors.blocks} />

                                    {form.data.blocks.map((block, index) => (
                                        <div
                                            key={index}
                                            className="rounded-[20px] border border-line bg-white p-5 shadow-sm"
                                        >
                                            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                                                <h3 className="text-xs font-bold tracking-widest text-ink-muted uppercase">
                                                    Block {index + 1}
                                                </h3>
                                                <div className="flex items-center gap-1">
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        disabled={index === 0}
                                                        onClick={() =>
                                                            moveBlock(index, -1)
                                                        }
                                                    >
                                                        <ArrowUp />
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        disabled={
                                                            index ===
                                                            form.data.blocks.length - 1
                                                        }
                                                        onClick={() =>
                                                            moveBlock(index, 1)
                                                        }
                                                    >
                                                        <ArrowDown />
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() =>
                                                            removeBlock(index)
                                                        }
                                                    >
                                                        <Trash2 className="text-red-600" />
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <div className="grid gap-2">
                                                    <Label>Kicker</Label>
                                                    <Input
                                                        value={block.kicker}
                                                        onChange={(event) =>
                                                            updateBlock(index, {
                                                                kicker: event.target.value,
                                                            })
                                                        }
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label>Title</Label>
                                                    <Input
                                                        value={block.title}
                                                        onChange={(event) =>
                                                            updateBlock(index, {
                                                                title: event.target.value,
                                                            })
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            <div className="mt-4 grid gap-2">
                                                <Label>Subtitle</Label>
                                                <Input
                                                    value={block.subtitle}
                                                    onChange={(event) =>
                                                        updateBlock(index, {
                                                            subtitle: event.target.value,
                                                        })
                                                    }
                                                />
                                            </div>

                                            <div className="mt-4 grid gap-2">
                                                <Label>Body</Label>
                                                <textarea
                                                    rows={4}
                                                    value={block.body}
                                                    onChange={(event) =>
                                                        updateBlock(index, {
                                                            body: event.target.value,
                                                        })
                                                    }
                                                    className="min-h-[8rem] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none"
                                                />
                                            </div>

                                            <div className="mt-4 grid gap-2">
                                                <Label>Image position</Label>
                                                <ToggleGroup
                                                    type="single"
                                                    variant="outline"
                                                    value={block.image_position}
                                                    onValueChange={(value) => {
                                                        if (
                                                            value === 'left' ||
                                                            value === 'right'
                                                        ) {
                                                            updateBlock(index, {
                                                                image_position: value,
                                                            });
                                                        }
                                                    }}
                                                    className="w-fit"
                                                >
                                                    <ToggleGroupItem value="left">
                                                        Image left
                                                    </ToggleGroupItem>
                                                    <ToggleGroupItem value="right">
                                                        Image right
                                                    </ToggleGroupItem>
                                                </ToggleGroup>
                                            </div>

                                            <div className="mt-4 grid gap-2">
                                                <Label>Image</Label>
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(event) =>
                                                        updateBlock(index, {
                                                            image:
                                                                event.currentTarget
                                                                    .files?.[0] ?? null,
                                                        })
                                                    }
                                                />
                                                <BlockImagePreview
                                                    file={block.image}
                                                    path={block.existing_image}
                                                />
                                                {!block.image && (
                                                    <Input
                                                        placeholder="/images/about/example.png"
                                                        value={block.existing_image}
                                                        onChange={(event) =>
                                                            updateBlock(index, {
                                                                existing_image:
                                                                    event.target.value,
                                                            })
                                                        }
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={addBlock}
                                    >
                                        <Plus /> Add block
                                    </Button>
                                </div>
                            ) : (
                                <div className="grid gap-2">
                                    <textarea
                                        required
                                        value={form.data.content}
                                        onChange={(event) =>
                                            form.setData('content', event.target.value)
                                        }
                                        className="min-h-[32rem] w-full rounded-md border border-input bg-transparent px-3 py-2 font-mono text-sm shadow-xs outline-none"
                                    />
                                    <InputError message={form.errors.content} />
                                </div>
                            )}
                        </>
                    )}

                    {isDemographic && (
                        <>
                            <div className="grid gap-2">
                                <Label>Intro text</Label>
                                <textarea
                                    value={form.data.intro}
                                    onChange={(event) =>
                                        form.setData('intro', event.target.value)
                                    }
                                    className="min-h-[8rem] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none"
                                />
                                <InputError message={form.errors.intro} />
                            </div>

                            <div className="space-y-4">
                                <Label>Stat cards</Label>
                                <InputError message={form.errors.stats} />
                                {form.data.stats.map((stat, index) => (
                                    <div
                                        key={index}
                                        className="rounded-[20px] border border-line bg-white p-5 shadow-sm"
                                    >
                                        <div className="mb-3 flex items-center justify-between">
                                            <h3 className="text-xs font-bold tracking-widest text-ink-muted uppercase">
                                                Stat {index + 1}
                                            </h3>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeStat(index)}
                                            >
                                                <Trash2 className="text-red-600" />
                                            </Button>
                                        </div>
                                        <div className="grid gap-4 sm:grid-cols-3">
                                            <div className="grid gap-2">
                                                <Label>Label</Label>
                                                <Input
                                                    value={stat.label}
                                                    onChange={(event) =>
                                                        updateStat(index, {
                                                            label: event.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label>Value</Label>
                                                <Input
                                                    value={stat.value}
                                                    onChange={(event) =>
                                                        updateStat(index, {
                                                            value: event.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label>Suffix</Label>
                                                <Input
                                                    value={stat.suffix}
                                                    onChange={(event) =>
                                                        updateStat(index, {
                                                            suffix: event.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={addStat}
                                >
                                    <Plus /> Add stat
                                </Button>
                            </div>

                            <div className="grid gap-2">
                                <Label>Image</Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) =>
                                        form.setData(
                                            'image',
                                            event.currentTarget.files?.[0] ?? null,
                                        )
                                    }
                                />
                                <BlockImagePreview
                                    file={form.data.image}
                                    path={form.data.existingImage}
                                />
                                {!form.data.image && (
                                    <Input
                                        placeholder="/images/about/example.png"
                                        value={form.data.existingImage}
                                        onChange={(event) =>
                                            form.setData(
                                                'existingImage',
                                                event.target.value,
                                            )
                                        }
                                    />
                                )}
                                <InputError message={form.errors.image} />
                            </div>
                        </>
                    )}

                    {isSocio && (
                        <div className="space-y-4">
                            <Label>Sector cards</Label>
                            <InputError message={form.errors.sectors} />
                            {form.data.sectors.map((sector, index) => (
                                <div
                                    key={index}
                                    className="rounded-[20px] border border-line bg-white p-5 shadow-sm"
                                >
                                    <div className="mb-3 flex items-center justify-between">
                                        <h3 className="text-xs font-bold tracking-widest text-ink-muted uppercase">
                                            Sector {index + 1}
                                        </h3>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeSector(index)}
                                        >
                                            <Trash2 className="text-red-600" />
                                        </Button>
                                    </div>
                                    <div className="grid gap-4">
                                        <div className="grid gap-2">
                                            <Label>Icon</Label>
                                            <Input
                                                value={sector.icon}
                                                onChange={(event) =>
                                                    updateSector(index, {
                                                        icon: event.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label>Title</Label>
                                            <Input
                                                value={sector.title}
                                                onChange={(event) =>
                                                    updateSector(index, {
                                                        title: event.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label>Description</Label>
                                            <textarea
                                                rows={3}
                                                value={sector.description}
                                                onChange={(event) =>
                                                    updateSector(index, {
                                                        description:
                                                            event.target.value,
                                                    })
                                                }
                                                className="min-h-[6rem] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                onClick={addSector}
                            >
                                <Plus /> Add sector
                            </Button>
                        </div>
                    )}

                    {isGeography && (
                        <>
                            <div className="grid gap-2">
                                <Label>Left text</Label>
                                <textarea
                                    value={form.data.leftText}
                                    onChange={(event) =>
                                        form.setData('leftText', event.target.value)
                                    }
                                    className="min-h-[10rem] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none"
                                />
                                <InputError message={(form.errors as Record<string, string>)['left_text']} />
                            </div>

                            <div className="grid gap-2">
                                <Label>Map image</Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) =>
                                        form.setData(
                                            'mapImage',
                                            event.currentTarget.files?.[0] ?? null,
                                        )
                                    }
                                />
                                <BlockImagePreview
                                    file={form.data.mapImage}
                                    path={form.data.existingMapImage}
                                />
                                {!form.data.mapImage && (
                                    <Input
                                        placeholder="/images/about/example.png"
                                        value={form.data.existingMapImage}
                                        onChange={(event) =>
                                            form.setData(
                                                'existingMapImage',
                                                event.target.value,
                                            )
                                        }
                                    />
                                )}
                                <InputError message={(form.errors as Record<string, string>)['map_image']} />
                            </div>

                            <div className="space-y-4">
                                <Label>Geographical facts</Label>
                                <InputError message={form.errors.facts} />
                                {form.data.facts.map((fact, index) => (
                                    <div
                                        key={index}
                                        className="rounded-[20px] border border-line bg-white p-5 shadow-sm"
                                    >
                                        <div className="mb-3 flex items-center justify-between">
                                            <h3 className="text-xs font-bold tracking-widest text-ink-muted uppercase">
                                                Fact {index + 1}
                                            </h3>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeFact(index)}
                                            >
                                                <Trash2 className="text-red-600" />
                                            </Button>
                                        </div>
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div className="grid gap-2">
                                                <Label>Label</Label>
                                                <Input
                                                    value={fact.label}
                                                    onChange={(event) =>
                                                        updateFact(index, {
                                                            label: event.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label>Value</Label>
                                                <Input
                                                    value={fact.value}
                                                    onChange={(event) =>
                                                        updateFact(index, {
                                                            value: event.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={addFact}
                                >
                                    <Plus /> Add fact
                                </Button>
                            </div>
                        </>
                    )}

                    <Button type="submit" disabled={form.processing}>
                        {form.processing ? 'Saving...' : 'Save Changes'}
                    </Button>
                </form>
            </AdminFormPage>
        </>
    );
}
